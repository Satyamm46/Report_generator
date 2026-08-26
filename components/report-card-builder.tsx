export default function ReportCardBuilder() {
  return (
    <div className="app">
      <div id="libError" className="lib-error" style={{ display: 'none' }}>
        {'⚠ Chart library failed to load. Charts can\u2019t be drawn until this loads — try reloading the page.'}
      </div>

      {/* ============ FORM PANEL ============ */}
      <div className="form-panel">
        <h1>Report Card Builder</h1>
        <p className="sub">
          {
            'Fill in the details on the left — the report on the right updates live. When it\u2019s ready, download it as a PDF.'
          }
        </p>
        <button className="download-btn" id="downloadBtn" type="button">
          {'⬇ Download as PDF'}
        </button>

        <div className="section">
          <div className="section-title">{'🏫 Institute'}</div>
          <div className="field">
            <label htmlFor="instituteName">Institute Name</label>
            <input type="text" id="instituteName" defaultValue="AEZ-NT LEARNER'S" />
          </div>
          <div className="field">
            <label htmlFor="instituteTag">Tagline</label>
            <input type="text" id="instituteTag" defaultValue="POWERED BY NALIN TUTORIALS LLP" />
          </div>

          <div className="field">
            <label htmlFor="logoFile">Logo Image (PNG / JPG / SVG)</label>
            <div className="logo-upload">
              <div className="logo-preview" id="logoPreview">
                {'🎓'}
              </div>
              <div className="logo-upload-controls">
                <input type="file" id="logoFile" accept="image/*" />
                <button type="button" className="tiny-btn" id="logoRemoveBtn">
                  Remove logo
                </button>
              </div>
            </div>
            <p className="hint">If no image is uploaded, a graduation-cap icon is used instead.</p>
          </div>
        </div>

        <div className="section">
          <div className="section-title">{'🧑‍🎓 Student Details'}</div>
          <div className="field">
            <label htmlFor="reportDate">Report Date</label>
            <input type="date" id="reportDate" defaultValue="2026-08-12" />
          </div>
          <div className="field">
            <label htmlFor="studentName">Student Name</label>
            <input type="text" id="studentName" defaultValue="Aarman" />
          </div>
          <div className="row2">
            <div className="field">
              <label htmlFor="courseLevel">Course / Level</label>
              <input type="text" id="courseLevel" defaultValue="IGCSE" />
            </div>
            <div className="field">
              <label htmlFor="teacherName">{'Teacher\u2019s Name'}</label>
              <input type="text" id="teacherName" defaultValue="Nalin Sir" />
            </div>
          </div>
        </div>

        <div className="section">
          <div className="section-title">{'📋 Test Series Details'}</div>
          <div id="testRows" />
          <button className="add-btn" id="addTestBtn" type="button">
            + Add Test
          </button>
        </div>

        <div className="section">
          <div className="section-title">{'📊 Score Distribution (all tests)'}</div>
          <p className="hint" style={{ marginBottom: 8 }}>
            Number of questions falling in each score range, across all tests.
          </p>
          <div className="row2">
            <div className="field">
              <label htmlFor="d0">{'0–20%'}</label>
              <input type="number" id="d0" defaultValue={2} />
            </div>
            <div className="field">
              <label htmlFor="d1">{'20–40%'}</label>
              <input type="number" id="d1" defaultValue={4} />
            </div>
          </div>
          <div className="row2">
            <div className="field">
              <label htmlFor="d2">{'40–60%'}</label>
              <input type="number" id="d2" defaultValue={7} />
            </div>
            <div className="field">
              <label htmlFor="d3">{'60–80%'}</label>
              <input type="number" id="d3" defaultValue={10} />
            </div>
          </div>
          <div className="field" style={{ width: 'calc(50% - 5px)' }}>
            <label htmlFor="d4">{'80–100%'}</label>
            <input type="number" id="d4" defaultValue={7} />
          </div>
        </div>

        <div className="section">
          <div className="section-title">{'📚 Subject-wise Performance'}</div>
          <div id="subjectRows" />
          <button className="add-btn" id="addSubjectBtn" type="button">
            + Add Subject / Topic
          </button>
        </div>

        <div className="section">
          <div className="section-title">{'🔎 Consistency Analysis'}</div>
          <div className="field">
            <label htmlFor="consistencyText">One point per line</label>
            <textarea
              id="consistencyText"
              style={{ minHeight: 150 }}
              defaultValue={`Aarman has shown good potential but inconsistent performance across the tests.
He scored an excellent 90% in Surds, demonstrating strong conceptual understanding and accuracy.
His performance dropped to 56.7% in Powers & Roots, indicating that consistency in applying concepts needs improvement.
The significant variation suggests he needs to maintain the same level of focus and accuracy across different topics.
Regular practice, especially in weaker areas, will help him build greater consistency and confidence.
Overall, Aarman has the ability to perform at a high level, and with more consistent preparation, he can sustain scores closer to his best performance.`}
            />
          </div>
        </div>

        <div className="section">
          <div className="section-title">{'⭐ Performance Highlight'}</div>
          <div className="field">
            <label htmlFor="highlightText">One point per line</label>
            <textarea
              id="highlightText"
              style={{ minHeight: 120 }}
              defaultValue={`He should focus on step-by-step working and avoiding calculation errors, particularly while manipulating and simplifying expressions.
He needs to avoid silly mistakes by carefully checking his solutions after completing each question.
With more consistent practice and revision, Aarman can strengthen his weaker areas and improve his overall performance.
Overall, Aarman is capable of achieving very good results, and greater consistency across topics will be key to his progress.`}
            />
          </div>
        </div>

        <div className="section">
          <div className="section-title">{'🗣️ Teacher\u2019s Feedback'}</div>
          <div className="field">
            <label htmlFor="feedbackText">One point per line</label>
            <textarea
              id="feedbackText"
              style={{ minHeight: 150 }}
              defaultValue={`Aarman has a strong understanding of concepts.
His performance in Powers & Roots dropped, indicating the need for more consistent practice and application of concepts across different topics.
He should focus on step-by-step working, proper simplification, and careful calculations to reduce errors.
He should check his solutions thoroughly before submitting, as avoiding small mistakes can help improve his scores significantly.
With steady practice and regular revision, Aarman can strengthen his weaker areas and improve his overall performance.
I would encourage him to stay confident and carry the same approach into every topic.`}
            />
          </div>
        </div>

        <div className="section">
          <div className="section-title">{'✅ Strengths'}</div>
          <div className="field">
            <label htmlFor="strengthsText">One point per line</label>
            <textarea
              id="strengthsText"
              defaultValue={`Strong performance in Surds & Indices and Laws of Indices.
Good accuracy in applying concepts to standard problems.
Consistent understanding of basic formulas and properties.`}
            />
          </div>
        </div>

        <div className="section">
          <div className="section-title">{'🎯 Improvement Areas'}</div>
          <div className="field">
            <label htmlFor="improveText">One point per line</label>
            <textarea
              id="improveText"
              defaultValue={`Work on accuracy in calculations, especially under time pressure.
Strengthen problem-solving skills in Powers & Roots.
Practice more questions on simplification and complex expressions.`}
            />
          </div>
        </div>
      </div>

      {/* ============ PREVIEW PANEL ============ */}
      <div className="preview-panel">
        <div id="report">
          <div className="page-block">
            <div className="rc-header">
              <div className="rc-logo" id="pvLogo">
                {'🎓'}
              </div>
              <div className="rc-brand-name" id="pvBrand">
                {"AEZ-NT LEARNER'S"}
              </div>
            </div>
            <div className="rc-powered" id="pvTag">
              -- POWERED BY NALIN TUTORIALS LLP --
            </div>

            <div className="rc-title-row">
              <div className="rc-title">STUDENT REPORT CARD</div>
              <div className="rc-badge">OFFICIAL RECORD</div>
            </div>
            <div className="rc-date" id="pvDate">
              12-08-26
            </div>
            <hr className="rc-hr" />

            <div className="info-grid">
              <div className="info-box">
                <div className="lbl">Student Name</div>
                <div className="val" id="pvStudentName">
                  Aarman
                </div>
              </div>
              <div className="info-box">
                <div className="lbl">Course / Level</div>
                <div className="val" id="pvCourse">
                  IGCSE
                </div>
              </div>
              <div className="info-box">
                <div className="lbl">{'Teacher\u2019s Name'}</div>
                <div className="val" id="pvTeacher">
                  Nalin Sir
                </div>
              </div>
            </div>

            <div className="block-title">Test Series Details</div>
            <table className="test-table">
              <thead>
                <tr>
                  <th>Test Paper / Series</th>
                  <th>Date</th>
                  <th>Marks Obtained</th>
                  <th>Total Marks</th>
                  <th>% Score</th>
                </tr>
              </thead>
              <tbody id="pvTestTable" />
            </table>

            <div className="block-title" style={{ marginTop: 26 }}>
              Test Summary
            </div>
            <div className="stat-grid">
              <div className="stat-card">
                <div className="icon avg">{'📈'}</div>
                <div className="lbl">Average %</div>
                <div className="val" id="stAvg">
                  {'–'}
                </div>
              </div>
              <div className="stat-card">
                <div className="icon high">{'🏆'}</div>
                <div className="lbl">Highest %</div>
                <div className="val" id="stHigh">
                  {'–'}
                </div>
              </div>
              <div className="stat-card">
                <div className="icon low">{'📉'}</div>
                <div className="lbl">Lowest %</div>
                <div className="val" id="stLow">
                  {'–'}
                </div>
              </div>
              <div className="stat-card">
                <div className="icon grade">{'🎓'}</div>
                <div className="lbl">Overall Grade</div>
                <div className="val" id="stGrade">
                  {'–'}
                </div>
              </div>
            </div>
          </div>

          <div className="page-block two-col">
            <div className="chart-card">
              <div className="chart-title">Test Wise % Score</div>
              <div className="chart-canvas-wrap">
                <canvas id="chartBar" />
              </div>
            </div>
            <div className="chart-card">
              <div className="chart-title">Score Trend</div>
              <div className="chart-canvas-wrap">
                <canvas id="chartLine" />
              </div>
            </div>
          </div>

          <div className="page-block two-col">
            <div className="chart-card">
              <div className="chart-title">Score Distribution (All Tests)</div>
              <div className="chart-canvas-wrap">
                <canvas id="chartDist" />
              </div>
            </div>
            <div className="chart-card">
              <div className="chart-title">Marks Overview</div>
              <div className="gauge-wrap">
                <div className="gauge-canvas-holder">
                  <canvas id="chartGauge" />
                  <div className="gauge-center">
                    <div className="big" id="gaugeMarks">
                      {'–'}
                    </div>
                    <div className="small">MARKS OBTAINED</div>
                  </div>
                </div>
                <div className="gauge-pct" id="gaugePct">
                  {'–'}
                </div>
                <div className="gauge-pct-label">Percentage Score</div>
              </div>
            </div>
          </div>

          <div className="page-block">
            <div className="chart-card">
              <div className="chart-title" style={{ textAlign: 'left' }}>
                Subject Wise Performance (Average %)
              </div>
              <div id="subjBars" style={{ marginTop: 14 }} />
            </div>
          </div>

          <div className="page-block">
            <div className="chart-card">
              <div className="chart-title">Test Summary (Overall)</div>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 24,
                  flexWrap: 'wrap',
                  justifyContent: 'center',
                }}
              >
                <div className="donut-wrap">
                  <canvas id="chartDonut" />
                </div>
                <div className="ring-grid" style={{ flex: 1, minWidth: 260 }}>
                  <div className="ring-card">
                    <div className="ring-holder">
                      <canvas id="ringAvg" />
                      <div className="ring-val" id="ringAvgVal">
                        {'–'}
                      </div>
                    </div>
                    <div className="ring-label">Average %</div>
                  </div>
                  <div className="ring-card">
                    <div className="ring-holder">
                      <canvas id="ringHigh" />
                      <div className="ring-val" id="ringHighVal">
                        {'–'}
                      </div>
                    </div>
                    <div className="ring-label">Highest %</div>
                  </div>
                  <div className="ring-card">
                    <div className="ring-holder">
                      <canvas id="ringLow" />
                      <div className="ring-val" id="ringLowVal">
                        {'–'}
                      </div>
                    </div>
                    <div className="ring-label">Lowest %</div>
                  </div>
                  <div className="ring-card">
                    <div className="grade-circle" id="ringGradeVal">
                      {'–'}
                    </div>
                    <div className="ring-label">Overall Grade</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="page-block">
            <div className="analysis-card">
              <div className="block-title" style={{ color: 'var(--blue)' }}>
                Consistency Analysis
              </div>
              <ul id="pvConsistency" />
            </div>
          </div>

          <div className="page-block two-card">
            <div className="side-card">
              <div className="block-title" style={{ color: 'var(--blue)' }}>
                Performance Highlight
              </div>
              <ul id="pvHighlight" />
            </div>
            <div className="side-card">
              <div className="block-title" style={{ color: 'var(--blue)' }}>
                {'Teacher\u2019s Feedback'}
              </div>
              <ul id="pvFeedback" />
            </div>
          </div>

          <div className="page-block two-card">
            <div className="side-card">
              <div className="block-title" style={{ color: 'var(--green)' }}>
                Strengths
              </div>
              <ul className="sw-list strength" id="pvStrengths" />
            </div>
            <div className="side-card">
              <div className="block-title" style={{ color: 'var(--red)' }}>
                Improvement Areas
              </div>
              <ul className="sw-list improve" id="pvImprove" />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
