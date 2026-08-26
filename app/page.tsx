import Script from 'next/script'
import ReportCardBuilder from '@/components/report-card-builder'

export default function Page() {
  return (
    <>
      {/* eslint-disable-next-line @next/next/no-css-tags */}
      <link rel="stylesheet" href="/style.css" />

      <ReportCardBuilder />

      <Script src="/vendor/chart.umd.min.js" strategy="beforeInteractive" />
      <Script src="/vendor/html2canvas.min.js" strategy="beforeInteractive" />
      <Script src="/vendor/jspdf.umd.min.js" strategy="beforeInteractive" />
      <Script src="/script.js" strategy="afterInteractive" />
    </>
  )
}
