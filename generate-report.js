const fs = require('fs');
const path = require('path');

class ReportGenerator {
  constructor() {
    this.resultsDir = path.join(__dirname, 'test-results');
    this.reportsDir = path.join(__dirname, 'reports');
    this.ensureDirectories();
  }

  ensureDirectories() {
    [this.reportsDir].forEach(dir => {
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
      }
    });
  }

  generateJsonReport() {
    try {
      console.log('📄 Generating JSON report...');
      const testResults = this.parseTestResults();
      const reportPath = path.join(this.reportsDir, 'test-report.json');
      fs.writeFileSync(reportPath, JSON.stringify(testResults, null, 2));
      console.log(`✅ JSON report generated: ${reportPath}`);
    } catch (error) {
      console.error('❌ Failed to generate JSON report:', error.message);
    }
  }

  generateHtmlReport() {
    try {
      console.log('📋 Generating HTML report...');
      const testResults = this.parseTestResults();
      const html = this.buildHtmlReport(testResults);
      const reportPath = path.join(this.reportsDir, 'test-report.html');
      fs.writeFileSync(reportPath, html);
      console.log(`✅ HTML report generated: ${reportPath}`);
    } catch (error) {
      console.error('❌ Failed to generate HTML report:', error.message);
    }
  }

  parseTestResults() {
    const results = {
      timestamp: new Date().toISOString(),
      totalTests: 0,
      passed: 0,
      failed: 0,
      skipped: 0,
      tests: []
    };

    if (!fs.existsSync(this.resultsDir)) return results;

    const files = fs.readdirSync(this.resultsDir).filter(f => f.endsWith('.json'));
    
    files.forEach(file => {
      try {
        const content = JSON.parse(fs.readFileSync(path.join(this.resultsDir, file), 'utf8'));
        if (content.suites) {
          content.suites.forEach(suite => {
            suite.specs?.forEach(spec => {
              results.totalTests++;
              results.tests.push({
                title: spec.title,
                status: spec.tests[0]?.status || 'unknown',
                duration: spec.tests[0]?.duration || 0,
                error: spec.tests[0]?.error?.message || null
              });
              
              if (spec.tests[0]?.status === 'passed') results.passed++;
              else if (spec.tests[0]?.status === 'failed') results.failed++;
              else if (spec.tests[0]?.status === 'skipped') results.skipped++;
            });
          });
        }
      } catch (e) {
        console.warn(`Warning: Could not parse ${file}`);
      }
    });

    return results;
  }

  buildHtmlReport(results) {
    const passRate = results.totalTests ? ((results.passed / results.totalTests) * 100).toFixed(2) : 0;
    
    return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>SureCafe Test Report</title>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background: #f5f5f5; color: #333; }
    .container { max-width: 1200px; margin: 0 auto; padding: 20px; }
    .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; border-radius: 8px; margin-bottom: 30px; }
    .header h1 { font-size: 2em; margin-bottom: 10px; }
    .stats { display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 15px; margin-top: 20px; }
    .stat { background: rgba(255,255,255,0.1); padding: 15px; border-radius: 6px; text-align: center; }
    .stat-value { font-size: 2em; font-weight: bold; }
    .stat-label { font-size: 0.9em; opacity: 0.9; }
    .summary { display: grid; grid-template-columns: repeat(4, 1fr); gap: 15px; margin-bottom: 30px; }
    .summary-card { background: white; padding: 20px; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1); }
    .summary-card h3 { margin-bottom: 10px; font-size: 0.9em; text-transform: uppercase; color: #666; }
    .summary-card .value { font-size: 2.5em; font-weight: bold; }
    .passed { color: #10b981; }
    .failed { color: #ef4444; }
    .skipped { color: #f59e0b; }
    .total { color: #667eea; }
    .test-list { background: white; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1); overflow: hidden; }
    .test-item { display: flex; align-items: center; padding: 15px 20px; border-bottom: 1px solid #eee; }
    .test-item:last-child { border-bottom: none; }
    .test-status { width: 24px; height: 24px; border-radius: 50%; margin-right: 15px; display: flex; align-items: center; justify-content: center; color: white; font-weight: bold; }
    .test-status.passed { background: #10b981; }
    .test-status.failed { background: #ef4444; }
    .test-status.skipped { background: #f59e0b; }
    .test-info { flex: 1; }
    .test-title { font-weight: 600; }
    .test-duration { color: #999; font-size: 0.9em; }
    .test-error { color: #ef4444; font-size: 0.85em; margin-top: 5px; }
    .footer { text-align: center; margin-top: 40px; color: #999; font-size: 0.9em; }
    @media (max-width: 768px) {
      .summary { grid-template-columns: repeat(2, 1fr); }
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>🧪 SureCafe Test Report</h1>
      <p>Generated on ${new Date().toLocaleString()}</p>
      <div class="stats">
        <div class="stat">
          <div class="stat-value">${results.totalTests}</div>
          <div class="stat-label">Total Tests</div>
        </div>
        <div class="stat">
          <div class="stat-value" style="color: #10b981;">${results.passed}</div>
          <div class="stat-label">Passed</div>
        </div>
        <div class="stat">
          <div class="stat-value" style="color: #ef4444;">${results.failed}</div>
          <div class="stat-label">Failed</div>
        </div>
        <div class="stat">
          <div class="stat-value">${passRate}%</div>
          <div class="stat-label">Pass Rate</div>
        </div>
      </div>
    </div>

    <div class="summary">
      <div class="summary-card">
        <h3>Total</h3>
        <div class="value total">${results.totalTests}</div>
      </div>
      <div class="summary-card">
        <h3>Passed</h3>
        <div class="value passed">${results.passed}</div>
      </div>
      <div class="summary-card">
        <h3>Failed</h3>
        <div class="value failed">${results.failed}</div>
      </div>
      <div class="summary-card">
        <h3>Skipped</h3>
        <div class="value skipped">${results.skipped}</div>
      </div>
    </div>

    <h2 style="margin-bottom: 20px; color: #333;">Test Details</h2>
    <div class="test-list">
      ${results.tests.length > 0 ? results.tests.map(test => `
        <div class="test-item">
          <div class="test-status ${test.status}">
            ${test.status === 'passed' ? '✓' : test.status === 'failed' ? '✕' : '○'}
          </div>
          <div class="test-info">
            <div class="test-title">${test.title}</div>
            <div class="test-duration">Duration: ${test.duration}ms</div>
            ${test.error ? `<div class="test-error">${test.error}</div>` : ''}
          </div>
        </div>
      `).join('') : '<div style="padding: 20px; text-align: center; color: #999;">No test results found</div>'}
    </div>

    <div class="footer">
      <p>SureCafe Playwright Test Suite Report</p>
    </div>
  </div>
</body>
</html>
    `;
  }

  generateAll() {
    console.log('🚀 Starting report generation...\n');
    this.generateJsonReport();
    this.generateHtmlReport();
    console.log('\n✨ All reports generated successfully!');
  }
}

const generator = new ReportGenerator();
generator.generateAll();
