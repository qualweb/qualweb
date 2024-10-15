export default [
  {
    code: `<!DOCTYPE html>
            <html lang="en">
            <body>
  <table>
  <tr>
    <th rowspan="2" id="h">Homework</th>
    <th colspan="3" id="e">Exams</th>
    <th colspan="3" id="p">Projects</th>
  </tr>
  <tr>
    <th id="e1" headers="e">1</th>
    <th id="e2" headers="e">2</th>
    <th id="ef" headers="e">Final</th>
    <th id="p1" headers="p">1</th>
    <th id="p2" headers="p">2</th>
    <th id="pf" headers="p">Final</th>
  </tr>
  <tr>
    <td headers="h">15%</td>
    <td headers="e e1">15%</td>
    <td headers="e e2">15%</td>
    <td headers="e ef">20%</td>
    <td headers="p p1">10%</td>
    <td headers="p p2">10%</td>
    <td headers="p pf">15%</td>
  </tr>
</table>
</body>
            </html >`,
    outcome: 'passed'
  },
  {
    code: `<!DOCTYPE html>
            <html lang="en">
            <body>
  <table>
  <tr>
    <th rowspan="2" id="h">Homework</th>
    <th colspan="3" id="e">Exams</th>
    <th colspan="3" id="p">Projects</th>
  </tr>
  <tr>
    <th id="e1" headers="e">1</th>
    <th id="e2" headers="e">2</th>
    <th id="ef" headers="e">Final</th>
    <th id="p1" headers="p">1</th>
    <th id="p2" headers="p">2</th>
    <th id="pf" headers="p">Final</th>
  </tr>
  <tr>
    <td headers="h">15%</td>
    <td headers="e e1">15%</td>
    <td headers="e e2">15%</td>
    <td headers="e ef">20%</td>
    <td headers="p p1">10%</td>
    <td headers="p p2">10%</td>
    <td headers="p pd">15%</td>
  </tr>
</table>
</body>
            </html >`,
    outcome: 'failed'
  }
];
