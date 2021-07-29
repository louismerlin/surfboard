import { html, useState, useEffect, render } from 'https://unpkg.com/htm/preact/standalone.module.js'

const { fetch, Math } = window

function App () {
  const [allScoreboards, setAllScoreboards] = useState({})
  const [teams, setTeams] = useState([])
  const [services, setServices] = useState([])
  const [statuses, setStatuses] = useState([])
  const [allTicks, setAllTicks] = useState([1])
  const [tick, setTick] = useState(1)

  useEffect(async () => {
    const res = await fetch('/scoreboard')
    const scoreboards = await res.json()
    setAllTicks(Object.keys(scoreboards).sort())
    setAllScoreboards(scoreboards)
    setTick(Math.max(...Object.keys(scoreboards)))
  }, [])

  useEffect(() => {
    const currentScoreboard = allScoreboards[tick]
    if (currentScoreboard) {
      setTeams(currentScoreboard.teams)
      setServices(currentScoreboard.services)
      setStatuses(currentScoreboard.statuses)
    }
  }, [tick])

  return html`
    <div class="row fixed">
      <div class="column">
        <h1>🏄 surfboard</h1>
      </div>
      <div class="column large">
        <input type="range" onInput=${e => setTick(e.target.value)} min="${allTicks[0]}" max="${allTicks[allTicks.length - 1]}" value="${tick}" class="slider" step="1" />
      </div>
      <div class="column">
        <h1>tick ${tick}</h1>
      </div>
    </div>
    <table>
      <thead>
        <tr>
        <th>#</th>
        <th class="border-right">Team</th>
        ${services.map(service => html`
          <th>${service}</th>
        `)}
        <th class="border-left">🔥 Total Offense</th>
        <th>🏰 Total Defense</th>
        <th class="border-right">⏱️ Total SLA</th>
        <th>Total</th>
        </tr>
      </thead>

      <tbody>
        ${teams.map(team => html`
          <tr>
            <td><b>${team.rank}</b></td>
            <td class="border-right"><b>${team.name}</b></td>
            ${team.services.map(service => html`
              <td class="${statuses[service.status]}">
                🔥 ${service.offense.toFixed(2)}<br />
                🏰 ${service.defense.toFixed(2)}<br />
                ⏱️ ${service.sla.toFixed(2)}<br />
                ${statuses[service.status]}
              </td>
            `)}
            <td class="border-left">${team.offense.toFixed(2)}</td>
            <td>${team.defense.toFixed(2)}</td>
            <td class="border-right">${team.sla.toFixed(2)}</td>
            <td>${team.total.toFixed(2)}</td>
          </tr>
        `)}
      </tbody>
    </table>
`
}
render(html`<${App} />`, document.getElementById('container'))
