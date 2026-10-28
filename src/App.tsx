import { useMemo, useState, type ReactNode } from "react";

type IconName =
  | "grid" | "machine" | "twin" | "pulse" | "spark" | "flask" | "bell"
  | "wrench" | "chart" | "report" | "users" | "sensor" | "settings"
  | "search" | "chevron" | "sun" | "more" | "arrow" | "play" | "pause"
  | "download" | "clock" | "bolt" | "check" | "warning" | "close";

const paths: Record<IconName, ReactNode> = {
  grid: <><rect x="3" y="3" width="7" height="7" rx="2"/><rect x="14" y="3" width="7" height="7" rx="2"/><rect x="3" y="14" width="7" height="7" rx="2"/><rect x="14" y="14" width="7" height="7" rx="2"/></>,
  machine: <><rect x="3" y="7" width="18" height="12" rx="2"/><path d="M7 7V4h10v3M7 19v2m10-2v2M8 12h4m4 0h1"/></>,
  twin: <><path d="M8 4 3 7v6l5 3 5-3V7L8 4Z"/><path d="m16 8 5 3v6l-5 3-5-3v-2m-8-8 5 3 5-3M8 10v6m8-5v9m-5-3 5-3 5 3"/></>,
  pulse: <><path d="M3 12h4l2-7 4 14 2-7h6"/><circle cx="12" cy="12" r="9"/></>,
  spark: <><path d="m12 3 1.6 4.4L18 9l-4.4 1.6L12 15l-1.6-4.4L6 9l4.4-1.6L12 3Z"/><path d="m18 15 .8 2.2L21 18l-2.2.8L18 21l-.8-2.2L15 18l2.2-.8L18 15Z"/></>,
  flask: <><path d="M9 3h6m-5 0v6l-5 9a2 2 0 0 0 2 3h10a2 2 0 0 0 2-3l-5-9V3"/><path d="M7 16h10"/></>,
  bell: <><path d="M18 8a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9ZM10 21h4"/></>,
  wrench: <><path d="M14 6a4 4 0 0 0-5-4l2.3 2.3-3 3L6 5a4 4 0 0 0 4 5L20 20l2-2-10-10"/></>,
  chart: <><path d="M4 20V10m6 10V4m6 16v-7m5 7H2"/></>,
  report: <><path d="M6 2h9l4 4v16H6z"/><path d="M14 2v5h5M9 12h6m-6 4h6"/></>,
  users: <><circle cx="9" cy="8" r="4"/><path d="M2 21a7 7 0 0 1 14 0m1-15a4 4 0 0 1 0 7m2 3a6 6 0 0 1 3 5"/></>,
  sensor: <><circle cx="12" cy="12" r="3"/><path d="M6.3 17.7a8 8 0 0 1 0-11.4m11.4 0a8 8 0 0 1 0 11.4M3.5 20.5a12 12 0 0 1 0-17m17 0a12 12 0 0 1 0 17"/></>,
  settings: <><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.7 1.7 0 0 0 .3 1.9l.1.1-2.8 2.8-.1-.1a1.7 1.7 0 0 0-1.9-.3 1.7 1.7 0 0 0-1 1.6v.2h-4V21a1.7 1.7 0 0 0-1-1.6 1.7 1.7 0 0 0-1.9.3l-.1.1L4.2 17l.1-.1a1.7 1.7 0 0 0 .3-1.9A1.7 1.7 0 0 0 3 14H2.8v-4H3a1.7 1.7 0 0 0 1.6-1 1.7 1.7 0 0 0-.3-1.9L4.2 7 7 4.2l.1.1a1.7 1.7 0 0 0 1.9.3 1.7 1.7 0 0 0 1-1.6v-.2h4V3a1.7 1.7 0 0 0 1 1.6 1.7 1.7 0 0 0 1.9-.3l.1-.1L19.8 7l-.1.1a1.7 1.7 0 0 0-.3 1.9 1.7 1.7 0 0 0 1.6 1h.2v4H21a1.7 1.7 0 0 0-1.6 1Z"/></>,
  search: <><circle cx="11" cy="11" r="7"/><path d="m20 20-4-4"/></>,
  chevron: <path d="m9 18 6-6-6-6"/>,
  sun: <><circle cx="12" cy="12" r="4"/><path d="M12 2v2m0 16v2M4.9 4.9l1.4 1.4m11.4 11.4 1.4 1.4M2 12h2m16 0h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/></>,
  more: <><circle cx="5" cy="12" r="1"/><circle cx="12" cy="12" r="1"/><circle cx="19" cy="12" r="1"/></>,
  arrow: <><path d="M5 12h14m-6-6 6 6-6 6"/></>,
  play: <path d="m8 5 11 7-11 7z"/>,
  pause: <><path d="M8 5v14m8-14v14"/></>,
  download: <><path d="M12 3v12m-5-5 5 5 5-5M5 21h14"/></>,
  clock: <><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></>,
  bolt: <path d="m13 2-8 12h7l-1 8 8-12h-7z"/>,
  check: <path d="m5 12 4 4L19 6"/>,
  warning: <><path d="M12 3 2 21h20L12 3Z"/><path d="M12 9v5m0 3v.1"/></>,
  close: <path d="m6 6 12 12M18 6 6 18"/>,
};

function Icon({ name, size = 18 }: { name: IconName; size?: number }) {
  return <svg className="icon" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{paths[name]}</svg>;
}

function Button({ children, variant = "secondary", icon, onClick, className = "" }: { children?: ReactNode; variant?: "primary" | "secondary" | "ghost" | "ai" | "danger"; icon?: IconName; onClick?: () => void; className?: string }) {
  return <button className={`btn btn-${variant} ${className}`} onClick={onClick}>{icon && <Icon name={icon} />}{children}</button>;
}

function Title({ children, as = "h2", className = "" }: { children: ReactNode; as?: "h1" | "h2" | "h3"; className?: string }) {
  const Tag = as;
  return <Tag className={`title ${className}`}>{children}</Tag>;
}

function Badge({ children, tone = "normal" }: { children: ReactNode; tone?: "normal" | "warning" | "critical" | "info" | "ai" | "neutral" }) {
  return <span className={`badge badge-${tone}`}><i />{children}</span>;
}

function Card({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <section className={`card ${className}`}>{children}</section>;
}

function Sparkline({ tone = "cyan", id = 0 }: { tone?: "cyan" | "green" | "orange" | "purple" | "red"; id?: number }) {
  const variants = [
    "2,28 12,24 22,27 32,14 42,19 52,10 62,16 72,8 82,12 92,5 100,9",
    "2,18 12,20 22,13 32,22 42,15 52,17 62,7 72,12 82,8 92,14 100,6",
    "2,25 12,18 22,20 32,12 42,17 52,9 62,14 72,4 82,12 92,7 100,11",
  ];
  return <svg className={`sparkline spark-${tone}`} viewBox="0 0 102 34" preserveAspectRatio="none"><defs><linearGradient id={`fill-${tone}-${id}`} x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="currentColor" stopOpacity=".3"/><stop offset="1" stopColor="currentColor" stopOpacity="0"/></linearGradient></defs><polygon points={`${variants[id % 3]} 100,34 2,34`} fill={`url(#fill-${tone}-${id})`}/><polyline points={variants[id % 3]} fill="none" stroke="currentColor" strokeWidth="2"/></svg>;
}

const navItems: { label: string; icon: IconName }[] = [
  { label: "Dashboard", icon: "grid" }, { label: "Machines", icon: "machine" },
  { label: "Digital Twin", icon: "twin" }, { label: "Live Monitoring", icon: "pulse" },
  { label: "Predictions", icon: "chart" }, { label: "Simulation", icon: "flask" },
  { label: "AI Assistant", icon: "spark" }, { label: "Alerts", icon: "bell" },
  { label: "Maintenance", icon: "wrench" }, { label: "Analytics", icon: "chart" },
  { label: "Reports", icon: "report" },
];
const adminItems: { label: string; icon: IconName }[] = [
  { label: "Users", icon: "users" }, { label: "Sensors", icon: "sensor" }, { label: "Settings", icon: "settings" },
];

const sensors = [
  { name: "Temperature", value: "72.4", unit: "°C", range: "40–80 °C", tone: "orange" as const, icon: "T" },
  { name: "Vibration", value: "4.8", unit: "mm/s", range: "0–5 mm/s", tone: "cyan" as const, icon: "V" },
  { name: "Current", value: "8.2", unit: "A", range: "5–10 A", tone: "green" as const, icon: "A" },
  { name: "Motor speed", value: "1,480", unit: "RPM", range: "1400–1550", tone: "purple" as const, icon: "R" },
  { name: "Pressure", value: "3.4", unit: "bar", range: "2–4 bar", tone: "cyan" as const, icon: "P" },
  { name: "Humidity", value: "62", unit: "%", range: "30–70%", tone: "green" as const, icon: "H" },
];

const machines = [
  { id: "MTR-001", name: "Industrial Motor A", line: "Production Line 01", status: "Normal", health: 94, temp: "72.4°C", vibration: "4.8 mm/s" },
  { id: "MTR-002", name: "Industrial Motor B", line: "Production Line 01", status: "Warning", health: 68, temp: "81.7°C", vibration: "6.2 mm/s" },
  { id: "MTR-003", name: "Industrial Motor C", line: "Production Line 02", status: "Fault Risk", health: 42, temp: "86.1°C", vibration: "7.2 mm/s" },
  { id: "CNC-004", name: "CNC Mill Alpha", line: "Production Line 03", status: "Normal", health: 91, temp: "65.8°C", vibration: "3.9 mm/s" },
];

function Sidebar({ active, setActive, collapsed, setCollapsed }: { active: string; setActive: (x: string) => void; collapsed: boolean; setCollapsed: (x: boolean) => void }) {
  return <aside className={`sidebar ${collapsed ? "collapsed" : ""}`}>
    <div className="brand"><div className="brand-mark"><Icon name="twin" size={22}/></div><div className="brand-copy"><strong>SmartTwin</strong><span>Industrial Intelligence</span></div></div>
    <nav className="nav">
      <span className="nav-label">PLATFORM</span>
      {navItems.map(item => <button key={item.label} className={`nav-item ${active === item.label ? "active" : ""}`} onClick={() => setActive(item.label)}><Icon name={item.icon}/><span>{item.label}</span>{item.label === "Alerts" && <b>3</b>}</button>)}
      <span className="nav-label admin-label">ADMINISTRATION</span>
      {adminItems.map(item => <button key={item.label} className={`nav-item ${active === item.label ? "active" : ""}`} onClick={() => setActive(item.label)}><Icon name={item.icon}/><span>{item.label}</span></button>)}
    </nav>
    <div className="sidebar-bottom">
      <div className="factory-chip"><span className="status-pulse"/><div><strong>Factory Online</strong><small>24 of 26 machines</small></div></div>
      <button className="profile"><span className="avatar">AM</span><span><strong>Alex Morgan</strong><small>Production Manager</small></span><Icon name="more"/></button>
      <button className="collapse-btn" onClick={() => setCollapsed(!collapsed)}><Icon name="chevron"/><span>Collapse sidebar</span></button>
    </div>
  </aside>;
}

function Header({ active, onMenu }: { active: string; onMenu: () => void }) {
  return <header className="topbar">
    <button className="mobile-menu" onClick={onMenu}><Icon name="grid"/></button>
    <div className="search"><Icon name="search"/><input aria-label="Global search" placeholder="Search machines, sensors, reports..." /><kbd>⌘ K</kbd></div>
    <div className="top-actions">
      <button className="factory-select"><span className="factory-icon"><Icon name="machine"/></span><span><small>FACTORY</small><strong>Detroit Plant 01</strong></span><Icon name="chevron"/></button>
      <div className="live-chip"><span className="status-pulse"/>SYSTEM LIVE</div>
      <span className="date-time"><strong>14:42:18</strong><small>MON, 24 JUN 2025</small></span>
      <Button variant="ai" icon="spark" className="ai-shortcut">Ask AI</Button>
      <button className="icon-button"><Icon name="bell"/><i>3</i></button>
      <button className="avatar top-avatar">AM</button>
    </div>
    <span className="mobile-title">{active}</span>
  </header>;
}

function PageHeading({ title, subtitle, children }: { title: string; subtitle: string; children?: ReactNode }) {
  return <div className="page-heading"><div><Title as="h1">{title}</Title><p>{subtitle}</p></div>{children && <div className="heading-actions">{children}</div>}</div>;
}

function FactoryIllustration({ detailed = false }: { detailed?: boolean }) {
  return <div className={`factory-visual ${detailed ? "detailed" : ""}`}>
    <div className="visual-grid"/><div className="scan-line"/>
    <div className="motor">
      <div className="motor-back"><span/><span/><span/></div>
      <div className="motor-body"><div className="motor-ribs"/><div className="motor-label">MTR-001<small>DIGITAL TWIN</small></div></div>
      <div className="motor-front"><div className="inner-ring"><div className="shaft"/></div></div>
      <div className="motor-base"/>
    </div>
    <div className="sensor-node node-1"><span/>T-201<small>72.4°C</small></div>
    <div className="sensor-node node-2"><span/>V-104<small>4.8 mm/s</small></div>
    <div className="sensor-node node-3"><span/>RPM<small>1,480</small></div>
    <div className="connection c1"/><div className="connection c2"/><div className="connection c3"/>
    {detailed && <><div className="component-label bearing">BEARING <span>Healthy · 92%</span></div><div className="component-label housing">HOUSING <span>Normal · 72°C</span></div><div className="axis-label">LIVE GEOMETRY · 1:1 SCALE</div></>}
  </div>;
}

function Dashboard({ navigate }: { navigate: (x: string) => void }) {
  const stats = [
    ["Total Machines", "26", "2 offline", "machine", "cyan"], ["Machines Online", "24", "92.3% availability", "pulse", "green"],
    ["Machines at Risk", "3", "1 new today", "warning", "orange"], ["Critical Alerts", "2", "Needs attention", "bell", "red"],
    ["Production Efficiency", "87.4%", "+2.8% this week", "bolt", "purple"], ["Overall Health", "89%", "Good condition", "check", "green"],
  ] as const;
  return <>
    <PageHeading title="Smart Factory Overview" subtitle="Real-time machine intelligence and predictive maintenance">
      <Button icon="download">Export summary</Button><Button variant="primary" icon="spark" onClick={() => navigate("AI Assistant")}>Generate AI briefing</Button>
    </PageHeading>
    <div className="stats-grid">{stats.map(([label,value,meta,icon,tone]) => <Card className={`stat-card stat-${tone}`} key={label}><div className="stat-top"><span className="stat-icon"><Icon name={icon as IconName}/></span><Icon name="more"/></div><strong className="stat-value">{value}</strong><span className="stat-label">{label}</span><small>{meta}</small><Sparkline tone={tone === "red" ? "red" : tone === "orange" ? "orange" : tone === "purple" ? "purple" : tone === "green" ? "green" : "cyan"} id={label.length}/></Card>)}</div>
    <div className="dashboard-grid">
      <Card className="health-card">
        <div className="card-header"><div><Title as="h3">Factory health</Title><p>Live operational state across all production lines</p></div><Badge tone="normal">LIVE DATA</Badge></div>
        <div className="health-content">
          <div className="health-gauge"><svg viewBox="0 0 200 120"><path d="M20 105a80 80 0 0 1 160 0" className="gauge-track"/><path d="M20 105a80 80 0 0 1 160 0" className="gauge-value"/></svg><div><strong>89</strong><span>/100</span><small>GOOD HEALTH</small></div></div>
          <div className="health-metrics">
            <div><span><i className="dot green"/>Normal</span><strong>18</strong><small>69.2%</small></div>
            <div><span><i className="dot orange"/>Warning</span><strong>5</strong><small>19.2%</small></div>
            <div><span><i className="dot red"/>Fault risk</span><strong>2</strong><small>7.7%</small></div>
            <div><span><i className="dot purple"/>Maintenance</span><strong>1</strong><small>3.9%</small></div>
          </div>
        </div>
        <div className="metric-bars">
          {[["Machine availability","92.3%"],["Production efficiency","87.4%"],["Energy performance","78.6%"]].map(([x,v]) => <div key={x}><span>{x}<strong>{v}</strong></span><div><i style={{width:v}}/></div></div>)}
        </div>
      </Card>
      <Card className="twin-preview">
        <div className="card-header"><div><Title as="h3">Live Digital Twin</Title><p>Industrial Motor A · MTR-001</p></div><Badge tone="info">SYNCED</Badge></div>
        <FactoryIllustration/>
        <div className="twin-footer"><span><i className="status-pulse"/>Twin latency <strong>18 ms</strong></span><Button variant="ghost" onClick={() => navigate("Digital Twin")}>Open Twin <Icon name="arrow"/></Button></div>
      </Card>
      <Card className="risk-card">
        <div className="card-header"><div><Title as="h3">Machines requiring attention</Title><p>Ranked by predictive risk score</p></div><Button variant="ghost" onClick={() => navigate("Machines")}>View all <Icon name="arrow"/></Button></div>
        <div className="risk-list">
          {machines.slice(1).map((m,i) => <button key={m.id} onClick={() => navigate(i === 0 ? "Predictions" : "Machines")}><span className={`machine-symbol risk-${i}`}><Icon name="machine"/></span><span className="risk-name"><strong>{m.name}</strong><small>{m.id} · {m.line}</small></span><span className="risk-sensor"><small>VIBRATION</small><strong>{m.vibration}</strong></span><span className="risk-health"><i style={{width:`${m.health}%`}}/><strong>{m.health}%</strong></span><Badge tone={i === 1 ? "critical" : "warning"}>{m.status}</Badge><Icon name="chevron"/></button>)}
        </div>
      </Card>
      <Card className="alerts-card">
        <div className="card-header"><div><Title as="h3">Recent alerts</Title><p>Latest machine events</p></div><Button variant="ghost" onClick={() => navigate("Alerts")}>View all</Button></div>
        <div className="activity-list">
          <div><span className="activity-icon critical"><Icon name="warning"/></span><p><strong>High vibration detected</strong><small>MTR-003 · Bearing sensor</small></p><time>2m ago</time></div>
          <div><span className="activity-icon warning"><Icon name="warning"/></span><p><strong>Temperature increasing</strong><small>MTR-002 · Thermal sensor</small></p><time>18m ago</time></div>
          <div><span className="activity-icon normal"><Icon name="check"/></span><p><strong>Maintenance completed</strong><small>CNC-004 · Work order #1042</small></p><time>1h ago</time></div>
        </div>
      </Card>
    </div>
  </>;
}

function Machines({ navigate }: { navigate: (x: string) => void }) {
  return <>
    <PageHeading title="Machine Fleet" subtitle="Monitor health, performance and status across 26 connected assets"><Button variant="primary" icon="machine">Register machine</Button></PageHeading>
    <Card className="toolbar-card"><div className="search inner"><Icon name="search"/><input placeholder="Search machine ID or name..."/></div><select><option>All statuses</option><option>Normal</option><option>Warning</option></select><select><option>All production lines</option></select><span className="toolbar-count">26 machines</span></Card>
    <div className="machine-grid">{machines.map((m,i) => <Card className="machine-card" key={m.id}><div className="machine-card-top"><div className={`machine-symbol machine-${i}`}><Icon name="machine" size={24}/></div><Badge tone={m.status === "Normal" ? "normal" : m.status === "Warning" ? "warning" : "critical"}>{m.status}</Badge></div><Title as="h3">{m.name}</Title><p>{m.id} · {m.line}</p><div className="machine-graph"><Sparkline tone={m.status === "Normal" ? "green" : m.status === "Warning" ? "orange" : "red"} id={i}/></div><div className="machine-readings"><span><small>TEMP</small><strong>{m.temp}</strong></span><span><small>VIBRATION</small><strong>{m.vibration}</strong></span><span><small>HEALTH</small><strong>{m.health}%</strong></span></div><div className="machine-card-footer"><small>Updated 12 sec ago</small><Button variant="ghost" onClick={() => navigate("Machine Details")}>View details <Icon name="arrow"/></Button></div></Card>)}</div>
  </>;
}

function MachineDetails({ navigate }: { navigate: (x: string) => void }) {
  return <>
    <div className="breadcrumb"><button onClick={() => navigate("Machines")}>Machines</button><Icon name="chevron"/><span>MTR-001</span></div>
    <PageHeading title="Motor MTR-001" subtitle="Industrial Motor A · Production Line 01">
      <Badge tone="normal">NORMAL OPERATION</Badge><Button icon="report">Service history</Button><Button variant="primary" onClick={() => navigate("Digital Twin")} icon="twin">Open Digital Twin</Button>
    </PageHeading>
    <div className="machine-detail-stats">
      {[["Machine health","94%","check","normal"],["Operating status","Running","pulse","normal"],["Total runtime","18,492 h","clock","info"],["Last maintenance","18 days ago","wrench","info"],["Next maintenance","12 days","clock","warning"],["Fault probability","6%","chart","normal"]].map(([label,value,icon,tone])=><Card key={label}><span className={`detail-stat-icon ${tone}`}><Icon name={icon as IconName}/></span><p><small>{label.toUpperCase()}</small><strong>{value}</strong></p></Card>)}
    </div>
    <div className="machine-detail-grid">
      <Card className="detail-twin">
        <div className="card-header"><div><Title as="h3">Live Digital Twin</Title><p>Geometry, condition and sensor telemetry</p></div><Badge tone="info">SYNCED · 18 MS</Badge></div>
        <FactoryIllustration detailed/>
        <div className="detail-twin-actions"><span><i className="status-pulse"/>All 6 sensors reporting</span><div><Button onClick={()=>navigate("Live Monitoring")} icon="pulse">Live monitoring</Button><Button variant="primary" onClick={()=>navigate("Digital Twin")}>Explore twin <Icon name="arrow"/></Button></div></div>
      </Card>
      <Card className="machine-info">
        <div className="card-header"><div><Title as="h3">Machine information</Title><p>Asset identity and lifecycle</p></div><Button variant="ghost" icon="settings">Edit</Button></div>
        <div className="info-list">
          {[["Machine ID","MTR-001"],["Motor type","3-phase induction motor"],["Production line","Line 01 · Assembly"],["Rated power","45 kW"],["Operating hours","18,492 hours"],["Installation date","12 March 2022"],["Last maintenance","06 June 2025"],["Assigned engineer","Maya Chen"]].map(([a,b])=><div key={a}><span>{a}</span><strong>{b}</strong></div>)}
        </div>
        <div className="maintenance-note"><Icon name="spark"/><p><strong>AI maintenance outlook</strong><span>No immediate intervention required. Maintain the planned inspection window in 12 days.</span></p></div>
      </Card>
    </div>
    <div className="detail-section-head"><div><Title as="h2">Live sensor condition</Title><p>Calibrated telemetry · updated 2 seconds ago</p></div><Button variant="ghost" onClick={()=>navigate("Live Monitoring")}>View all telemetry <Icon name="arrow"/></Button></div>
    <div className="detail-sensor-grid">{sensors.map((s,i)=><Card className="detail-sensor" key={s.name}><div><span className={`sensor-icon sensor-${s.tone}`}>{s.icon}</span><Badge tone={i===0?"warning":"normal"}>{i===0?"ELEVATED":"NORMAL"}</Badge></div><small>{s.name.toUpperCase()}</small><strong>{s.value} <em>{s.unit}</em></strong><span>Normal range: {s.range}</span><Sparkline tone={s.tone} id={i}/><button onClick={()=>navigate("Live Monitoring")}>Inspect sensor <Icon name="arrow"/></button></Card>)}</div>
  </>;
}

function DigitalTwin({ navigate }: { navigate: (x: string) => void }) {
  return <>
    <PageHeading title="Digital Twin" subtitle="Real-time virtual representation of the physical machine"><Badge tone="normal">TWIN SYNCHRONIZED · 18 MS</Badge><Button icon="report">Snapshot</Button></PageHeading>
    <div className="twin-layout">
      <Card className="twin-side left-panel">
        <span className="eyebrow">ACTIVE MACHINE</span><button className="machine-picker"><span className="machine-symbol"><Icon name="machine"/></span><span><strong>Industrial Motor A</strong><small>MTR-001 · Line 01</small></span><Icon name="chevron"/></button>
        <div className="sync-score"><div><Icon name="twin"/><span><strong>100%</strong><small>TWIN FIDELITY</small></span></div><div className="progress"><i/></div><small>Last synchronized 2s ago</small></div>
        <span className="eyebrow">COMPONENTS</span>
        {["Motor Housing","Drive Bearing","Rotor & Shaft","Cooling Fan","Electrical Unit"].map((x,i) => <button className="component-row" key={x}><span>{String(i+1).padStart(2,"0")}</span><p><strong>{x}</strong><small>{i === 1 ? "Warning · inspect soon" : "Operational · normal"}</small></p><Badge tone={i === 1 ? "warning" : "normal"}>{i === 1 ? "92%" : "OK"}</Badge></button>)}
      </Card>
      <Card className="twin-main">
        <div className="viewer-toolbar"><span>INTERACTIVE ASSET VIEW</span><div><Button variant="ghost">Rotate</Button><Button variant="ghost">Exploded view</Button><Button variant="ghost">Reset</Button></div></div>
        <FactoryIllustration detailed/>
        <div className="viewer-controls"><Button icon="twin">Components</Button><Button icon="sensor">Sensors</Button><Button icon="pulse">Thermal layer</Button></div>
      </Card>
      <Card className="twin-side condition-panel"><div className="card-header"><div><Title as="h3">Live condition</Title><p>Streaming at 10 Hz</p></div><span className="status-pulse"/></div>
        <div className="live-sensors">{sensors.map((s,i) => <button key={s.name}><span className={`sensor-icon sensor-${s.tone}`}>{s.icon}</span><p><small>{s.name.toUpperCase()}</small><strong>{s.value} <em>{s.unit}</em></strong></p><Sparkline tone={s.tone} id={i}/><Badge tone={i === 0 ? "warning" : "normal"}>{i === 0 ? "HIGH" : "NORMAL"}</Badge></button>)}</div>
        <Button variant="primary" onClick={() => navigate("Live Monitoring")} className="full-button">Open live monitoring <Icon name="arrow"/></Button>
      </Card>
    </div>
    <Card className="timeline-card"><div className="card-header"><div><Title as="h3">Digital Twin Timeline</Title><p>Live events and model updates</p></div><Badge tone="info">AUTO-SCROLL</Badge></div><div className="timeline">{[["14:42:08","Sensor update","All channels synchronized","normal"],["14:42:04","Temperature increased","+2.1°C over 5 minutes","warning"],["14:41:56","Vibration anomaly detected","Frequency peak at 118 Hz","critical"],["14:41:42","DNN prediction updated","Health confidence now 94%","ai"]].map(([time,name,desc,tone]) => <div key={name}><time>{time}</time><i className={`dot ${tone}`}/><p><strong>{name}</strong><small>{desc}</small></p></div>)}</div></Card>
  </>;
}

function Monitoring() {
  const [range,setRange] = useState("15 min"); const [live,setLive] = useState(true);
  return <>
    <PageHeading title="Live Sensor Monitoring" subtitle="High-frequency telemetry from MTR-001 · Industrial Motor A"><Badge tone={live ? "normal" : "warning"}>{live ? "LIVE · 10 HZ" : "PAUSED"}</Badge><Button icon="download">Export data</Button><Button variant="primary" icon={live ? "pause" : "play"} onClick={() => setLive(!live)}>{live ? "Pause" : "Resume"}</Button></PageHeading>
    <div className="range-bar"><span>TIME RANGE</span>{["1 min","5 min","15 min","1 hour","24 hours","7 days"].map(x => <button className={range === x ? "active" : ""} onClick={() => setRange(x)} key={x}>{x}</button>)}<small>Last update: just now</small></div>
    <div className="sensor-grid">{sensors.map((s,i) => <Card className="sensor-chart-card" key={s.name}><div className="sensor-chart-head"><span className={`sensor-icon sensor-${s.tone}`}>{s.icon}</span><div><small>{s.name.toUpperCase()}</small><strong>{s.value} <em>{s.unit}</em></strong></div><Badge tone={i === 0 ? "warning" : "normal"}>{i === 0 ? "ELEVATED" : "NORMAL"}</Badge></div><div className="big-chart"><span className="threshold">NORMAL THRESHOLD</span><Sparkline tone={s.tone} id={i}/><div className="chart-lines"/></div><div className="chart-footer"><span>MIN <strong>{i === 0 ? "68.1" : "3.2"}</strong></span><span>AVG <strong>{s.value}</strong></span><span>MAX <strong>{i === 0 ? "74.8" : "5.1"}</strong></span><small>{s.range}</small></div></Card>)}</div>
  </>;
}

function Predictions({ navigate }: { navigate: (x: string) => void }) {
  return <>
    <PageHeading title="Predictive Maintenance" subtitle="DNN-powered machine fault prediction and risk analysis"><Button icon="clock">Prediction history</Button><Button variant="ai" icon="spark" onClick={() => navigate("AI Assistant")}>Explain with AI</Button></PageHeading>
    <div className="prediction-grid">
      <Card className="prediction-hero"><div className="prediction-title"><div><span className="eyebrow">ACTIVE PREDICTION</span><Title as="h2">Industrial Motor A</Title><p>MTR-001 · Production Line 01</p></div><Badge tone="critical">HIGH FAULT RISK</Badge></div><div className="probability"><div className="prob-ring"><svg viewBox="0 0 120 120"><circle cx="60" cy="60" r="50"/><circle className="prob-fill" cx="60" cy="60" r="50"/></svg><span><strong>87%</strong><small>FAULT<br/>PROBABILITY</small></span></div><div className="prediction-meta"><span><small>PREDICTION HORIZON</small><strong>Next 24 hours</strong></span><span><small>MODEL CONFIDENCE</small><strong>94%</strong></span><span><small>PRIMARY FAULT MODE</small><strong>Bearing degradation</strong></span><span><small>DNN MODEL</small><strong>ST-Predict v4.2</strong></span></div></div><div className="recommendation"><Icon name="spark"/><p><strong>AI recommendation</strong><span>Schedule preventive inspection within 24 hours. Bearing vibration signature is trending toward failure threshold.</span></p><Button variant="ai" onClick={() => navigate("AI Assistant")}>View explanation</Button></div></Card>
      <Card className="factor-card"><div className="card-header"><div><Title as="h3">Prediction factors</Title><p>Feature contribution to risk score</p></div></div>{[["Vibration",48,"critical"],["Temperature",32,"warning"],["Current",12,"info"],["RPM",8,"ai"]].map(([x,n,tone]) => <div className="factor" key={x}><span>{x}<strong>+{n}%</strong></span><div><i className={`${tone}`} style={{width:`${n}%`}}/></div><small>{Number(n) > 40 ? "Primary contributor" : Number(n) > 20 ? "Significant contributor" : "Low impact"}</small></div>)}</Card>
      <Card className="history-card"><div className="card-header"><div><Title as="h3">Condition forecast</Title><p>Actual vs. DNN predicted machine health</p></div><div className="legend"><i className="actual"/>Actual condition <i className="predicted"/>Predicted</div></div><div className="forecast-chart"><svg viewBox="0 0 800 210" preserveAspectRatio="none"><g className="gridlines"><path d="M0 30H800M0 80H800M0 130H800M0 180H800"/></g><path className="actual-line" d="M0 45 C100 50 130 65 200 58 S330 74 410 80 S500 110 560 105"/><path className="predicted-line" d="M560 105 C630 120 690 150 800 185"/><path className="warning-line" d="M0 155H800"/></svg><span className="now-line">NOW</span><span className="threshold-label">FAULT THRESHOLD</span><div className="chart-axis"><span>24h ago</span><span>12h ago</span><span>Now</span><span>+12h</span><span>+24h</span></div></div></Card>
    </div>
  </>;
}

function AIAssistant({ navigate }: { navigate: (x: string) => void }) {
  const [message,setMessage] = useState(""); const [sent,setSent] = useState(false);
  return <div className="ai-page">
    <PageHeading title="SmartTwin AI" subtitle="AI-powered machine intelligence assistant"><Badge tone="ai">GENERATIVE AI · ONLINE</Badge><Button icon="report">New conversation</Button></PageHeading>
    <div className="ai-layout"><Card className="context-panel"><span className="eyebrow">MACHINE CONTEXT</span><div className="context-machine"><span className="machine-symbol"><Icon name="machine"/></span><p><strong>Industrial Motor C</strong><small>MTR-003 · Line 02</small></p><Badge tone="critical">FAULT RISK</Badge></div><div className="context-health"><div><strong>42%</strong><small>MACHINE HEALTH</small></div><div className="health-mini"><i/></div><p><Icon name="warning"/>Health declined 18% in 6 hours</p></div><span className="eyebrow">CURRENT SENSOR STATE</span><div className="context-sensors">{sensors.slice(0,4).map((s,i) => <div key={s.name}><span className={`sensor-icon sensor-${i < 2 ? "orange" : s.tone}`}>{s.icon}</span><p><small>{s.name}</small><strong>{i === 0 ? "86.0" : i === 1 ? "7.2" : i === 2 ? "10.4" : "1,420"} {s.unit}</strong></p><Badge tone={i < 2 ? "critical" : "warning"}>{i < 2 ? "HIGH" : "WATCH"}</Badge></div>)}</div><Button variant="ghost" className="full-button" onClick={() => navigate("Digital Twin")}>View Digital Twin <Icon name="arrow"/></Button></Card>
    <Card className="chat-panel"><div className="chat-head"><div className="ai-orb"><Icon name="spark" size={24}/></div><p><strong>SmartTwin Intelligence</strong><small>Analyzing live machine data · DNN + GenAI</small></p><span className="status-pulse"/></div><div className="chat-body"><div className="system-note"><Icon name="spark"/>I’m monitoring MTR-003 with live twin and sensor context.</div><div className="message ai-message"><div className="ai-orb small"><Icon name="spark"/></div><div><p>Bearing failure risk is increasing.</p><p>The vibration level has increased significantly while temperature is also rising. This pattern is consistent with progressive drive-end bearing degradation.</p><div className="ai-callout"><strong>Recommended action</strong><p>Schedule preventive maintenance within <b>24 hours</b>.</p><span>Inspect</span><ul><li>Motor bearing and raceway</li><li>Shaft alignment</li><li>Lubrication condition</li><li>Cooling airflow</li></ul></div><small>Generated from 14,240 sensor samples · 94% confidence</small></div></div>{sent && <div className="message user-message"><div><p>{message || "Generate a maintenance plan for this machine."}</p></div><span className="avatar">AM</span></div>}</div>
      <div className="quick-prompts">{["Explain problem","Recommend action","Generate maintenance plan","Summarize machine"].map(x => <button key={x} onClick={() => {setMessage(x);setSent(true)}}><Icon name="spark"/>{x}</button>)}</div>
      <div className="chat-input"><textarea value={message} onChange={e => setMessage(e.target.value)} placeholder="Ask SmartTwin AI about this machine..."/><Button variant="ai" onClick={() => setSent(true)}>Ask AI <Icon name="arrow"/></Button></div>
      <div className="chat-disclaimer"><Icon name="warning"/>AI recommendations should be reviewed by a qualified maintenance engineer.</div>
    </Card></div>
  </div>;
}

function Simulation({ navigate }: { navigate: (x: string) => void }) {
  const [values,setValues] = useState([95,8,10,1200,4,70]); const [ran,setRan] = useState(false);
  const setValue=(i:number,v:number)=>setValues(x=>x.map((a,j)=>j===i?v:a));
  return <>
    <PageHeading title="What-If Machine Simulation" subtitle="Model operating conditions before taking action"><Badge tone="info">DIGITAL TWIN SANDBOX</Badge><Button>Reset scenario</Button></PageHeading>
    <div className="simulation-grid"><Card className="sim-input"><div className="card-header"><div><Title as="h3">Simulation inputs</Title><p>Adjust virtual sensor conditions</p></div></div><div className="sim-machine"><span className="machine-symbol"><Icon name="machine"/></span><p><small>MACHINE</small><strong>Industrial Motor A · MTR-001</strong></p><Icon name="chevron"/></div>{[["Temperature",70,110,"°C"],["Vibration",3,12,"mm/s"],["Current",6,15,"A"],["Motor speed",1000,1800,"RPM"],["Pressure",2,6,"bar"],["Humidity",20,90,"%"]].map(([name,min,max,unit],i)=><div className="slider-row" key={String(name)}><span><strong>{name}</strong><small>Current: {i===3 ? "1,500" : i===0 ? "70" : min} {unit}</small></span><output>{values[i]} {unit}</output><input type="range" min={Number(min)} max={Number(max)} value={values[i]} onChange={e=>setValue(i,Number(e.target.value))}/><div><small>{min} {unit}</small><small>{max} {unit}</small></div></div>)}<Button variant="primary" icon="play" className="run-button" onClick={()=>setRan(true)}>{ran ? "Simulation complete" : "Run simulation"}</Button></Card>
    <Card className={`sim-result ${ran ? "ran" : ""}`}><div className="card-header"><div><Title as="h3">Predicted machine condition</Title><p>DNN inference based on simulated values</p></div><Badge tone={ran ? "critical" : "neutral"}>{ran ? "HIGH FAULT RISK" : "READY"}</Badge></div><div className="condition-compare"><div><small>CURRENT CONDITION</small><strong><i className="dot green"/>Normal</strong><span>Health score <b>94%</b></span></div><Icon name="arrow" size={26}/><div><small>SIMULATED CONDITION</small><strong className={ran ? "danger-text" : ""}><i className={`dot ${ran ? "red" : "neutral"}`}/>{ran ? "High fault risk" : "Awaiting run"}</strong><span>Health score <b>{ran ? "38%" : "—"}</b></span></div></div><div className="sim-prob"><div className="prob-ring small-ring"><svg viewBox="0 0 120 120"><circle cx="60" cy="60" r="50"/><circle className="prob-fill" cx="60" cy="60" r="50"/></svg><span><strong>{ran ? "82%" : "—"}</strong><small>FAULT RISK</small></span></div><div><Title as="h3">{ran ? "Bearing overheating likely" : "Run a scenario to see results"}</Title><p>{ran ? "Elevated temperature and vibration create a compounding fault condition." : "The Digital Twin will estimate health, cost and production impact."}</p></div></div><span className="eyebrow">EXPECTED IMPACT</span><div className="impact-grid">{[["Downtime risk",ran?"High":"—","critical"],["Maintenance cost",ran?"+$4,200":"—","warning"],["Production efficiency",ran?"−18%":"—","warning"],["Safety risk",ran?"Elevated":"—","critical"]].map(([a,b,t])=><div key={a}><small>{a}</small><strong className={`${t}-text`}>{b}</strong><i><span className={String(t)} style={{width:ran?"78%":"0%"}}/></i></div>)}</div>{ran&&<div className="recommendation compact"><Icon name="spark"/><p><strong>AI recommendation</strong><span>Reduce load and inspect drive-end bearing before continued operation.</span></p><Button variant="ai" onClick={()=>navigate("AI Assistant")}>Ask AI</Button></div>}</Card></div>
  </>;
}

function DataPage({ active, navigate }: { active: string; navigate: (x:string)=>void }) {
  const content: Record<string,{sub:string; cards:string[]; action:string}> = {
    Alerts:{sub:"Prioritized events and recommended response actions",cards:["Critical events","Warnings","Information","Maintenance due"],action:"Configure alerts"},
    Maintenance:{sub:"Plan, assign and track predictive maintenance work",cards:["Due this week","Overdue","In progress","Completed this month"],action:"Schedule maintenance"},
    Analytics:{sub:"Operational intelligence across your connected factory",cards:["Avg. machine health","Downtime this month","Production efficiency","Energy per unit"],action:"Create analysis"},
    Reports:{sub:"Generate audit-ready manufacturing intelligence reports",cards:["Machine health","Predictive maintenance","Sensor performance","AI recommendations"],action:"Generate report"},
    Sensors:{sub:"Configure, calibrate and monitor connected IoT devices",cards:["Connected sensors","Healthy","Needs calibration","Offline"],action:"Add sensor"},
    Users:{sub:"Manage factory access, roles and operational permissions",cards:["Active users","Operators","Engineers","Administrators"],action:"Invite user"},
    Settings:{sub:"Factory, machine, AI, security and appearance configuration",cards:["Factory profile","Sensor thresholds","AI configuration","Security"],action:"Save changes"},
  };
  const d=content[active] || content.Analytics;
  const rows = active === "Users" ? [["Alex Morgan","Production Manager","Operations","Active"],["Maya Chen","Maintenance Engineer","Reliability","Active"],["Jordan Lee","Factory Operator","Line 01","Active"],["Sam Rivera","System Administrator","IT","Away"]] : active === "Sensors" ? [["TMP-201","Temperature","MTR-001","72.4 °C"],["VIB-104","Vibration","MTR-001","4.8 mm/s"],["CUR-018","Current","MTR-002","8.2 A"],["RPM-044","Motor speed","MTR-003","1,420 RPM"]] : [["MTR-003","High vibration detected","Critical","2 min ago"],["MTR-002","Temperature increasing","Warning","18 min ago"],["CNC-004","Preventive service due","Maintenance","Tomorrow"],["MTR-001","DNN prediction updated","Information","1 hour ago"]];
  return <><PageHeading title={active} subtitle={d.sub}><Button icon="download">Export</Button><Button variant="primary" icon={active==="Reports"?"report":active==="Users"?"users":"spark"}>{d.action}</Button></PageHeading><div className="data-stats">{d.cards.map((x,i)=><Card key={x}><span className={`data-icon data-${i}`}><Icon name={active==="Users"?"users":active==="Sensors"?"sensor":active==="Maintenance"?"wrench":active==="Reports"?"report":"chart"}/></span><small>{x.toUpperCase()}</small><strong>{active==="Users"?[24,12,7,2][i]:active==="Sensors"?[142,136,4,2][i]:[active==="Analytics"?"89.2%":active==="Reports"?"12":"3",active==="Analytics"?"14.2h":"5","18","42"][i]}</strong><span>{i===0?"+4.2% this month":"Updated just now"}</span></Card>)}</div><Card className="data-table-card"><div className="card-header"><div><Title as="h3">{active==="Users"?"Factory users":active==="Sensors"?"Sensor registry":active==="Settings"?"Configuration sections":active==="Reports"?"Recent reports":active==="Maintenance"?"Maintenance work orders":"Recent activity"}</Title><p>Connected records and operational status</p></div><div className="search compact-search"><Icon name="search"/><input placeholder="Search records..."/></div></div><div className="data-table"><div className="table-head"><span>{active==="Users"?"NAME":"ASSET / ID"}</span><span>DESCRIPTION</span><span>STATUS</span><span>UPDATED</span><span>ACTION</span></div>{rows.map((r,i)=><button key={r[0]} onClick={()=>active==="Alerts"&&navigate("Predictions")}><span><i className={`table-symbol symbol-${i}`}><Icon name={active==="Users"?"users":active==="Sensors"?"sensor":"machine"}/></i><strong>{r[0]}</strong></span><span>{r[1]}</span><span><Badge tone={i===0&&active!=="Users"?"critical":i===1&&active!=="Users"?"warning":"normal"}>{r[2]}</Badge></span><span>{r[3]}</span><span><Button variant="ghost">View <Icon name="arrow"/></Button></span></button>)}</div></Card></>;
}

function Login({ onLogin }: { onLogin:()=>void }) {
  return <main className="login-page"><div className="login-visual"><div className="login-brand"><div className="brand-mark"><Icon name="twin"/></div><strong>SmartTwin</strong></div><div className="login-copy"><Badge tone="info">INDUSTRY 4.0 INTELLIGENCE</Badge><Title as="h1">Every machine has a story.<br/><span>Now you can hear it.</span></Title><p>Connect physical assets to intelligent digital twins, predict failures before they happen, and turn sensor data into decisive action.</p><div className="login-stats"><span><strong>99.98%</strong><small>TWIN UPTIME</small></span><span><strong>18 ms</strong><small>SYNC LATENCY</small></span><span><strong>32%</strong><small>LESS DOWNTIME</small></span></div></div><FactoryIllustration detailed/><small className="login-foot">IoT sensors · Deep Neural Networks · Generative AI</small></div><div className="login-form-wrap"><div className="login-form"><div className="mobile-login-brand"><div className="brand-mark"><Icon name="twin"/></div><strong>SmartTwin</strong></div><span className="eyebrow">WELCOME BACK</span><Title as="h1">Smart Manufacturing Twin</Title><p>Sign in to your factory intelligence workspace.</p><label>Work email<input defaultValue="alex.morgan@smarttwin.io" type="email"/></label><label>Password<span><input defaultValue="smartfactory" type="password"/><button>Show</button></span></label><div className="form-options"><label><input type="checkbox" defaultChecked/>Remember me</label><button>Forgot password?</button></div><Button variant="primary" onClick={onLogin} className="login-button">Sign in to workspace <Icon name="arrow"/></Button><Button onClick={onLogin} className="login-button">Continue as demo user</Button><div className="secure-note"><Icon name="check"/><p><strong>Enterprise-grade security</strong><small>Your connection is encrypted and protected.</small></p></div></div><small className="copyright">© 2025 SmartTwin Systems · Privacy · Security</small></div></main>;
}

export default function App() {
  const [active,setActive] = useState("Dashboard"); const [collapsed,setCollapsed] = useState(false); const [mobileOpen,setMobileOpen] = useState(false); const [loggedIn,setLoggedIn] = useState(false);
  const page = useMemo(()=>{
    if(active==="Dashboard") return <Dashboard navigate={setActive}/>;
    if(active==="Machines") return <Machines navigate={setActive}/>;
    if(active==="Machine Details") return <MachineDetails navigate={setActive}/>;
    if(active==="Digital Twin") return <DigitalTwin navigate={setActive}/>;
    if(active==="Live Monitoring") return <Monitoring/>;
    if(active==="Predictions") return <Predictions navigate={setActive}/>;
    if(active==="AI Assistant") return <AIAssistant navigate={setActive}/>;
    if(active==="Simulation") return <Simulation navigate={setActive}/>;
    return <DataPage active={active} navigate={setActive}/>;
  },[active]);
  if(!loggedIn) return <Login onLogin={()=>setLoggedIn(true)}/>;
  return <div className={`app-shell ${mobileOpen ? "mobile-open" : ""}`}><Sidebar active={active} setActive={(x)=>{setActive(x);setMobileOpen(false)}} collapsed={collapsed} setCollapsed={setCollapsed}/><div className="shell-main"><Header active={active} onMenu={()=>setMobileOpen(!mobileOpen)}/><main className="page">{page}</main><nav className="mobile-nav">{navItems.slice(0,5).map((x,i)=><button key={x.label} className={active===x.label?"active":""} onClick={()=>setActive(x.label)}><Icon name={x.icon}/><span>{i===2?"Twin":x.label.replace("Live ","")}</span></button>)}</nav></div>{mobileOpen&&<button className="scrim" onClick={()=>setMobileOpen(false)}/>}</div>;
}
