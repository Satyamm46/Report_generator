let charts = {};
let testIdCounter = 0;
let subjIdCounter = 0;
let logoDataUrl = null; // holds base64 image once uploaded

const defaultTests = [
  {name:'Surds', date:'2026-07-19', obtained:27, total:30},
  {name:'Powers & Roots', date:'2026-07-26', obtained:17, total:30}
];
const defaultSubjects = [
  {topic:'Surds & Indices', avg:72.5},
  {topic:'Laws of Indices', avg:74.0},
  {topic:'Roots & Rational Exponents', avg:70.0},
  {topic:'Simplification', avg:62.5},
  {topic:'Calculations', avg:57.5},
  {topic:'Problem Solving', avg:67.5}
];

function fmtDate(iso){
  if(!iso) return '';
  const [y,m,d] = iso.split('-');
  return `${d}-${m}-${y.slice(2)}`;
}

function addTestRow(data){
  const id = 'test'+(testIdCounter++);
  const d = data || {name:'', date:'', obtained:'', total:30};
  const wrap = document.createElement('div');
  wrap.className = 'test-row';
  wrap.id = id;
  wrap.innerHTML = `
    <button class="remove-btn" type="button">✕</button>
    <div class="grid4">
      <div><span class="mini-label">Test / Paper</span><input type="text" class="t-name" value="${d.name}"></div>
      <div><span class="mini-label">Date</span><input type="date" class="t-date" value="${d.date}"></div>
      <div><span class="mini-label">Obtained</span><input type="number" class="t-obtained" value="${d.obtained}"></div>
      <div><span class="mini-label">Total</span><input type="number" class="t-total" value="${d.total}"></div>
    </div>`;
  document.getElementById('testRows').appendChild(wrap);
  wrap.querySelector('.remove-btn').addEventListener('click', ()=>{ wrap.remove(); renderAll(); });
  wrap.querySelectorAll('input').forEach(inp=>inp.addEventListener('input', renderAll));
}

function addSubjectRow(data){
  const id = 'subj'+(subjIdCounter++);
  const d = data || {topic:'', avg:''};
  const wrap = document.createElement('div');
  wrap.className = 'subject-row';
  wrap.id = id;
  wrap.innerHTML = `
    <button class="remove-btn" type="button">✕</button>
    <div class="grid2">
      <div><span class="mini-label">Subject / Topic</span><input type="text" class="s-topic" value="${d.topic}"></div>
      <div><span class="mini-label">Average %</span><input type="number" class="s-avg" value="${d.avg}"></div>
    </div>`;
  document.getElementById('subjectRows').appendChild(wrap);
  wrap.querySelector('.remove-btn').addEventListener('click', ()=>{ wrap.remove(); renderAll(); });
  wrap.querySelectorAll('input').forEach(inp=>inp.addEventListener('input', renderAll));
}

function getGrade(pct){
  if(pct>=90) return 'A+';
  if(pct>=80) return 'A';
  if(pct>=70) return 'B+';
  if(pct>=60) return 'B';
  if(pct>=50) return 'C+';
  if(pct>=40) return 'C';
  return 'D';
}

function bulletsFromTextarea(id){
  return document.getElementById(id).value.split('\n').map(s=>s.trim()).filter(Boolean);
}

function destroyChart(key){
  if(charts[key]){ charts[key].destroy(); delete charts[key]; }
}

function escapeHtml(str){
  const d = document.createElement('div');
  d.textContent = str;
  return d.innerHTML;
}

function renderLogo(){
  const previewEl = document.getElementById('logoPreview');
  const pvLogoEl = document.getElementById('pvLogo');
  if(logoDataUrl){
    previewEl.innerHTML = `<img src="${logoDataUrl}" alt="Logo">`;
    pvLogoEl.innerHTML = `<img src="${logoDataUrl}" alt="Logo">`;
  } else {
    previewEl.textContent = '🎓';
    pvLogoEl.textContent = '🎓';
  }
}

function renderAll(){
  // ---- meta ----
  document.getElementById('pvBrand').textContent = document.getElementById('instituteName').value || 'INSTITUTE NAME';
  document.getElementById('pvTag').textContent = '-- ' + (document.getElementById('instituteTag').value || '') + ' --';
  document.getElementById('pvDate').textContent = fmtDate(document.getElementById('reportDate').value);
  document.getElementById('pvStudentName').textContent = document.getElementById('studentName').value || '—';
  document.getElementById('pvCourse').textContent = document.getElementById('courseLevel').value || '—';
  document.getElementById('pvTeacher').textContent = document.getElementById('teacherName').value || '—';

  // ---- tests ----
  const rows = [...document.querySelectorAll('#testRows .test-row')];
  const tests = rows.map(r=>{
    const name = r.querySelector('.t-name').value || 'Untitled';
    const date = r.querySelector('.t-date').value;
    const obtained = parseFloat(r.querySelector('.t-obtained').value) || 0;
    const total = parseFloat(r.querySelector('.t-total').value) || 0;
    const pct = total>0 ? (obtained/total*100) : 0;
    return {name,date,obtained,total,pct};
  });

  const tbody = document.getElementById('pvTestTable');
  tbody.innerHTML = tests.map(t=>`
    <tr>
      <td class="name">${escapeHtml(t.name)}</td>
      <td>${fmtDate(t.date)}</td>
      <td>${t.obtained}</td>
      <td>${t.total}</td>
      <td class="pct">${t.pct.toFixed(1)}%</td>
    </tr>`).join('') || `<tr><td colspan="5" style="color:var(--gray-soft);padding:16px 0;">Add a test to see it here.</td></tr>`;

  const pcts = tests.map(t=>t.pct);
  const avg = pcts.length ? pcts.reduce((a,b)=>a+b,0)/pcts.length : 0;
  const high = pcts.length ? Math.max(...pcts) : 0;
  const low = pcts.length ? Math.min(...pcts) : 0;
  const grade = getGrade(avg);
  const sumObtained = tests.reduce((a,t)=>a+t.obtained,0);
  const sumTotal = tests.reduce((a,t)=>a+t.total,0);
  const overallPct = sumTotal>0 ? (sumObtained/sumTotal*100) : 0;

  document.getElementById('stAvg').textContent = avg.toFixed(1)+'%';
  document.getElementById('stHigh').textContent = high.toFixed(1)+'%';
  document.getElementById('stLow').textContent = low.toFixed(1)+'%';
  document.getElementById('stGrade').textContent = grade;

  // ---- subjects (plain CSS bars — no chart library needed) ----
  const subjRows = [...document.querySelectorAll('#subjectRows .subject-row')];
  const subjects = subjRows.map(r=>({
    topic: r.querySelector('.s-topic').value || 'Untitled',
    avg: parseFloat(r.querySelector('.s-avg').value) || 0
  }));
  const subjOverall = subjects.length ? subjects.reduce((a,s)=>a+s.avg,0)/subjects.length : 0;
  const subjBarsEl = document.getElementById('subjBars');
  subjBarsEl.innerHTML = subjects.map(s=>`
    <div class="subj-row">
      <div class="subj-name">${escapeHtml(s.topic)}</div>
      <div class="subj-bar-track"><div class="subj-bar-fill" style="width:${Math.min(s.avg,100)}%;"></div></div>
      <div class="subj-pct">${s.avg.toFixed(1)}%</div>
    </div>`).join('') +
    `<div class="subj-overall">
      <div class="subj-name">Overall Average</div>
      <div class="subj-bar-track"><div class="subj-bar-fill" style="width:${Math.min(subjOverall,100)}%;background:var(--blue);"></div></div>
      <div class="subj-pct">${subjOverall.toFixed(1)}%</div>
    </div>`;

  // ---- text blocks (also no chart library needed) ----
  document.getElementById('pvConsistency').innerHTML = bulletsFromTextarea('consistencyText').map(l=>`<li>${escapeHtml(l)}</li>`).join('');
  document.getElementById('pvHighlight').innerHTML = bulletsFromTextarea('highlightText').map(l=>`<li>${escapeHtml(l)}</li>`).join('');
  document.getElementById('pvFeedback').innerHTML = bulletsFromTextarea('feedbackText').map(l=>`<li>${escapeHtml(l)}</li>`).join('');
  document.getElementById('pvStrengths').innerHTML = bulletsFromTextarea('strengthsText').map(l=>`<li><span class="dot">✓</span>${escapeHtml(l)}</li>`).join('');
  document.getElementById('pvImprove').innerHTML = bulletsFromTextarea('improveText').map(l=>`<li><span class="dot">•</span>${escapeHtml(l)}</li>`).join('');

  // Charts need the Chart.js library. This is the LAST section in the
  // function and safe to bail out of early — everything above (fields,
  // table, stats, subject bars, and all text blocks) has already rendered
  // regardless of whether the chart library is available.
  if(typeof Chart === 'undefined'){
    document.getElementById('libError').style.display = 'block';
    return;
  }
  document.getElementById('libError').style.display = 'none';

  try{

  // ---- bar chart: test wise % score ----
  destroyChart('bar');
  charts.bar = new Chart(document.getElementById('chartBar'), {
    type:'bar',
    data:{
      labels: tests.map(t=>t.name),
      datasets:[{
        data: pcts,
        backgroundColor: tests.map((_,i)=>['#2E4C8A','#1E9E5A','#E8940C','#7C5CD8','#DC3545'][i%5]),
        borderRadius:6, maxBarThickness:60
      }]
    },
    options:{
      responsive:true,
      maintainAspectRatio:false,
      plugins:{legend:{display:false}, tooltip:{callbacks:{label:c=>c.parsed.y.toFixed(1)+'%'}}},
      scales:{y:{beginAtZero:true, max:100}, x:{grid:{display:false}}}
    }
  });

  // ---- line chart: score trend ----
  destroyChart('line');
  charts.line = new Chart(document.getElementById('chartLine'), {
    type:'line',
    data:{
      labels: tests.map((t,i)=>`Test ${i+1}`),
      datasets:[{
        data: pcts, borderColor:'#2E4C8A', backgroundColor:'#2E4C8A',
        tension:0.25, pointRadius:5, pointBackgroundColor:'#2E4C8A', fill:false
      }]
    },
    options:{
      responsive:true,
      maintainAspectRatio:false,
      plugins:{legend:{display:false}, tooltip:{callbacks:{label:c=>c.parsed.y.toFixed(1)+'%'}}},
      scales:{y:{beginAtZero:true, max:100}, x:{grid:{display:false}}}
    }
  });

  // ---- distribution chart ----
  const dist = [0,1,2,3,4].map(i=>parseFloat(document.getElementById('d'+i).value)||0);
  destroyChart('dist');
  charts.dist = new Chart(document.getElementById('chartDist'), {
    type:'bar',
    data:{
      labels:['0-20%','20-40%','40-60%','60-80%','80-100%'],
      datasets:[{
        data: dist,
        backgroundColor:['#DC3545','#E8940C','#F2C744','#1E9E5A','#2E7FD8'],
        borderRadius:6, maxBarThickness:44
      }]
    },
    options:{
      responsive:true,
      maintainAspectRatio:false,
      plugins:{legend:{display:false}},
      scales:{y:{beginAtZero:true, title:{display:true,text:'No. of Questions',font:{size:10}}}, x:{grid:{display:false}}}
    }
  });

  // ---- gauge ----
  destroyChart('gauge');
  charts.gauge = new Chart(document.getElementById('chartGauge'), {
    type:'doughnut',
    data:{ datasets:[{ data:[overallPct, 100-overallPct], backgroundColor:['#2E4C8A','#EEF0F3'], borderWidth:0 }]},
    options:{ cutout:'78%', responsive:true, maintainAspectRatio:false, plugins:{legend:{display:false}, tooltip:{enabled:false}} }
  });
  document.getElementById('gaugeMarks').textContent = `${sumObtained} / ${sumTotal}`;
  document.getElementById('gaugePct').textContent = overallPct.toFixed(1)+'%';

  // ---- donut summary ----
  destroyChart('donut');
  charts.donut = new Chart(document.getElementById('chartDonut'), {
    type:'doughnut',
    data:{
      labels:['Average %','Highest %','Lowest %','Overall Grade'],
      datasets:[{ data:[40,30,17,13], backgroundColor:['#2E4C8A','#1E9E5A','#E8940C','#7C5CD8'], borderWidth:0 }]
    },
    options:{
      cutout:'62%',
      responsive:true,
      maintainAspectRatio:false,
      plugins:{
        legend:{position:'bottom', labels:{boxWidth:10, font:{size:10}}},
        tooltip:{enabled:false}
      }
    },
    plugins:[{
      id:'centerText',
      afterDraw(chart){
        const {ctx, chartArea:{width,height,top,left}} = chart;
        ctx.save();
        ctx.textAlign='center'; ctx.textBaseline='middle';
        ctx.font='800 20px Segoe UI'; ctx.fillStyle='#1E2430';
        ctx.fillText(avg.toFixed(1)+'%', left+width/2, top+height/2-8);
        ctx.font='600 10px Segoe UI'; ctx.fillStyle='#9AA1AC';
        ctx.fillText('AVERAGE %', left+width/2, top+height/2+12);
        ctx.restore();
      }
    }]
  });

  function ring(id, val, color){
    destroyChart(id);
    charts[id] = new Chart(document.getElementById(id), {
      type:'doughnut',
      data:{ datasets:[{ data:[val,100-val], backgroundColor:[color,'#EEF0F3'], borderWidth:0 }]},
      options:{ cutout:'72%', plugins:{legend:{display:false},tooltip:{enabled:false}}, responsive:true, maintainAspectRatio:false }
    });
  }
  ring('ringAvg', avg, '#2E4C8A');
  ring('ringHigh', high, '#1E9E5A');
  ring('ringLow', low, '#DC3545');
  document.getElementById('ringAvgVal').textContent = avg.toFixed(0)+'%';
  document.getElementById('ringHighVal').textContent = high.toFixed(0)+'%';
  document.getElementById('ringLowVal').textContent = low.toFixed(0)+'%';
  document.getElementById('ringGradeVal').textContent = grade;

  }catch(err){
    console.error('Chart rendering failed:', err);
  }
}

async function downloadPdf(){
  const btn = document.getElementById('downloadBtn');
  btn.disabled = true;
  btn.textContent = 'Preparing PDF…';
  const el = document.getElementById('report');
  try{
    const canvas = await html2canvas(el, {scale:2, backgroundColor:'#FBFAF7', useCORS:true});
    const { jsPDF } = window.jspdf;
    const pdf = new jsPDF('p','pt','a4');
    const pageW = pdf.internal.pageSize.getWidth();
    const pageH = pdf.internal.pageSize.getHeight();
    const imgW = pageW;
    const imgH = (canvas.height * imgW) / canvas.width;
    let heightLeft = imgH;
    let position = 0;
    const imgData = canvas.toDataURL('image/jpeg', 0.95);

    pdf.addImage(imgData, 'JPEG', 0, position, imgW, imgH);
    heightLeft -= pageH;
    while(heightLeft > 0){
      position = heightLeft - imgH;
      pdf.addPage();
      pdf.addImage(imgData, 'JPEG', 0, position, imgW, imgH);
      heightLeft -= pageH;
    }
    const name = (document.getElementById('studentName').value || 'student').replace(/\s+/g,'_');
    pdf.save(`Report_Card_${name}.pdf`);
  }catch(e){
    alert('Something went wrong generating the PDF: ' + e.message);
    console.error(e);
  }finally{
    btn.disabled = false;
    btn.textContent = '⬇ Download as PDF';
  }
}

function initLogoUpload(){
  const fileInput = document.getElementById('logoFile');
  const removeBtn = document.getElementById('logoRemoveBtn');

  fileInput.addEventListener('change', (e)=>{
    const file = e.target.files[0];
    if(!file) return;
    const reader = new FileReader();
    reader.onload = (ev)=>{
      logoDataUrl = ev.target.result; // base64 data URL, works offline & in PDF export
      renderLogo();
    };
    reader.readAsDataURL(file);
  });

  removeBtn.addEventListener('click', ()=>{
    logoDataUrl = null;
    fileInput.value = '';
    renderLogo();
  });
}

function initStaticFieldListeners(){
  ['instituteName','instituteTag','reportDate','studentName','courseLevel','teacherName',
   'd0','d1','d2','d3','d4','consistencyText','highlightText','feedbackText','strengthsText','improveText']
   .forEach(id=>{
     document.getElementById(id).addEventListener('input', renderAll);
   });
}

let initialized = false;

function init(){
  // The script can be injected after DOMContentLoaded has already fired,
  // so init() is called directly in that case. Guard against double-init.
  if(initialized) return;
  initialized = true;

  defaultTests.forEach(addTestRow);
  defaultSubjects.forEach(addSubjectRow);
  initStaticFieldListeners();
  initLogoUpload();

  document.getElementById('addTestBtn').addEventListener('click', ()=>addTestRow());
  document.getElementById('addSubjectBtn').addEventListener('click', ()=>addSubjectRow());
  document.getElementById('downloadBtn').addEventListener('click', downloadPdf);

  renderLogo();
  renderAll();
}

if(document.readyState === 'loading'){
  window.addEventListener('DOMContentLoaded', init);
} else {
  init();
}
