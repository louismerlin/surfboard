import { html, useState, useEffect, render } from 'https://unpkg.com/htm/preact/standalone.module.js'

const { fetch } = global

function App () {
  const [teams, setTeams] = useState([])
  const [services, setServices] = useState([])
  const [statuses, setStatuses] = useState([])
  useEffect(async () => {
    const res = await fetch('/scoreboard')
    const scoreboard = await res.json()
    setTeams(scoreboard.teams)
    setServices(scoreboard.services)
    setStatuses(scoreboard.statuses)
  }, [])
  return html`
    <h1>🏄 surfboard</h1>
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
