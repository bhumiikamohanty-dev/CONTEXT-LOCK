import React, {useState, useRef} from 'react';
import {createRoot} from 'react-dom/client';
import {Home, Search, Compass, Clapperboard, MessageCircle, Heart, PlusSquare, Menu, Instagram, ShieldCheck, X, Upload, Type, Sticker, Music2, MoreHorizontal, ArrowLeft, RotateCcw, Check, Eye, Users, Send} from 'lucide-react';
import './style.css';

const findings = [
 {id:'email', label:'Email address', detail:'amartya.demo@example.com', risk:'HIGH', points:35, top:'63%', left:'12%', width:'76%', height:'7%'},
 {id:'phone', label:'Phone number', detail:'+91 98765 43210', risk:'HIGH', points:35, top:'73%', left:'12%', width:'64%', height:'7%'},
 {id:'location', label:'Location', detail:'Dwarka, New Delhi', risk:'MEDIUM', points:20, top:'83%', left:'12%', width:'58%', height:'7%'}
];
function App(){
 const [view,setView]=useState('feed'), [scan,setScan]=useState(false), [safe,setSafe]=useState(false);
 const [image,setImage]=useState(null), [actions,setActions]=useState({email:'redact',phone:'blur',location:'keep'});
 const [uploaded,setUploaded]=useState(false), [storyText,setStoryText]=useState('A little moment worth sharing ✨');
 const fileRef=useRef(null);
 const riskScore=Math.max(0,findings.reduce((sum,f)=>sum+(actions[f.id]==='keep'?f.points:0),0));
 const riskLevel=riskScore>=60?'HIGH RISK':riskScore>=25?'MEDIUM RISK':'LOW RISK';
 const chooseFile=(e)=>{const f=e.target.files?.[0]; if(f){setImage(URL.createObjectURL(f));setUploaded(true);setView('story');setScan(false);setSafe(false)}};
 const openStory=()=>{setView('story');setScan(false);setSafe(false)};
 const apply=(id,action)=>setActions(a=>({...a,[id]:action}));
 const reset=()=>{setActions({email:'redact',phone:'blur',location:'keep'});setSafe(false);setScan(false)};
 const share=(audience)=>{alert(`Demo only: Story preview prepared for ${audience}. Nothing is published to Instagram.`)};
 const artStyle={backgroundImage:image?`url(${image})`:undefined};
 return <div className="app-shell">
  <aside className="sidebar">
   <div className="brand"><Instagram size={26}/><span>Instagram</span></div>
   <nav>{[[Home,'Home'],[Search,'Search'],[Compass,'Explore'],[Clapperboard,'Reels'],[MessageCircle,'Messages'],[Heart,'Notifications'],[PlusSquare,'Create']].map(([Icon,label])=><button key={label} className={'navitem '+(label==='Home'&&view==='feed'?'active':'')} onClick={label==='Create'?openStory:()=>setView('feed')}><Icon size={22}/><span>{label}</span></button>)}</nav>
   <button className="navitem profile-link" onClick={()=>setView('feed')}><div className="avatar small">A</div><span>Profile</span></button>
   <button className="navitem more"><Menu size={22}/><span>More</span></button>
  </aside>
  <main className="main-area">
   {view==='feed'?<div className="feed-layout">
    <section className="feed">
     <div className="stories">
      <button className="story-bubble" onClick={openStory}><div className="ring add"><span>＋</span></div><small>Your story</small></button>
      {['mira','rohan','campuslife','travel.diary','designs'].map((n,i)=><button className="story-bubble" key={n}><div className={'ring hue'+i}><div className="avatar">{n[0].toUpperCase()}</div></div><small>{n}</small></button>)}
     </div>
     <article className="post">
      <div className="post-head"><div className="avatar">C</div><div><b>campus.creators</b><small>Delhi · 2h</small></div><MoreHorizontal className="push"/></div>
      <div className="post-art"><span className="eyebrow">CAMPUS MOMENTS</span><strong>Big ideas.<br/>Real impact.</strong><span>Student Innovation Showcase</span></div>
      <div className="post-actions"><Heart/><MessageCircle/><Send/><span className="push"><BookmarkIcon/></span></div>
      <div className="post-copy"><b>campus.creators</b> Building things that matter. <span className="muted">#innovation</span></div>
     </article>
     <article className="post second"><div className="post-head"><div className="avatar alt">M</div><div><b>mira.illustrates</b><small>Suggested for you</small></div><MoreHorizontal className="push"/></div><div className="second-art">MAKE SPACE<br/>FOR WHAT MATTERS</div><div className="post-actions"><Heart/><MessageCircle/><Send/></div></article>
    </section>
    <aside className="suggestions"><div className="user-row"><div className="avatar">A</div><div><b>amartya.demo</b><small className="muted">Your account</small></div><a>Switch</a></div><h4>Suggested for you <span className="push">See All</span></h4>{['Bhumika Mohanty','Chaitanya Agrawal','Design Daily'].map((n,i)=><div className="user-row" key={n}><div className={'avatar hue'+i}>{n[0]}</div><div><b>{n}</b><small className="muted">Suggested</small></div><a>Follow</a></div>)}<p className="legal">About · Help · Press · API · Jobs · Privacy<br/>Terms · Locations · Language<br/><br/>© 2026 INSTAGRAM · CONTEXTLOCK DEMO</p></aside>
   </div>:<div className="story-workspace">
    <header className="story-top"><button className="icon-button" onClick={()=>{setView('feed');setScan(false)}}><ArrowLeft/></button><div><b>Create story</b><small>Instagram interface · demo</small></div><button className="icon-button push" onClick={()=>setView('feed')}><X/></button></header>
    <div className="editor">
     <div className="canvas-wrap"><div className="story-canvas" style={artStyle}>
      {!image&&<div className="sample-art"><span className="sample-label">YOUR STORY</span><h2>Little moments.<br/>Big memories.</h2><p>Weekend recap ✨</p><div className="sample-photo">✦</div></div>}
      {image&&<div className="image-overlay"><span className="sample-label">YOUR STORY</span></div>}
      {safe&&findings.map(f=>actions[f.id]!=='keep'&&<div key={f.id} className={'mask '+actions[f.id]} style={{top:f.top,left:f.left,width:f.width,height:f.height}}>{actions[f.id]==='redact'?'':f.detail}</div>)}
      <div className="story-caption">{storyText}</div>
     </div></div>
     <div className="tools-column"><div className="tool-rail"><button title="Text"><Type/></button><button title="Stickers"><Sticker/></button><button title="Music"><Music2/></button><button title="More"><MoreHorizontal/></button></div>
      <div className="edit-panel"><h3>Story editor</h3><p>Add a photo, customize your Story, then check what might be exposed.</p><label className="upload-btn"><Upload size={17}/> {uploaded?'Change photo':'Upload photo'}<input ref={fileRef} type="file" accept="image/*" onChange={chooseFile}/></label><label className="field-label">Story text</label><textarea value={storyText} onChange={e=>setStoryText(e.target.value)} rows="3"/><div className="privacy-tip"><ShieldCheck size={18}/><span>ContextLock privacy review is built into this editor.</span></div>
       <button className="privacy-btn" onClick={()=>{setScan(true);setSafe(false)}}><ShieldCheck size={18}/> Check Privacy</button>
      </div>
     </div>
    </div>
    <div className="sharebar"><button className="audience" onClick={()=>share('Your Story')}><div className="audience-icon">＋</div><span>Your Story</span></button><button className="audience" onClick={()=>share('Close Friends')}><div className="audience-icon green">★</div><span>Close Friends</span></button><button className="share-next" onClick={()=>share('selected audience')}>Share <Send size={16}/></button></div>
   </div>}
  </main>
  {scan&&<div className="overlay" onClick={()=>setScan(false)}><div className="privacy-modal" onClick={e=>e.stopPropagation()}>
   <div className="modal-head"><div className="shield-circle"><ShieldCheck/></div><div><h2>Check Privacy</h2><p>Review details before sharing your Story</p></div><button className="icon-button push" onClick={()=>setScan(false)}><X/></button></div>
   <div className="scan-body"><div className="scan-preview"><div className="mini-story" style={artStyle}>{!image&&<span>Story preview</span>}{findings.map(f=><div key={f.id} className={'mini-detail '+(actions[f.id]==='keep'?'':actions[f.id])} style={{top:f.top,left:f.left,width:f.width,height:f.height}}>{f.detail}</div>)}</div><div className="scan-status"><span className="status-dot"></span> Simulated scan · 3 findings · {riskLevel}</div></div>
    <div className="findings"><div className="risk-summary">
      <div className="risk-gauge" style={{'--score':`${riskScore*3.6}deg`}}><div className="risk-gauge-inner"><strong>{riskScore}</strong><small>/100</small></div></div>
      <div className="risk-copy"><span className={`risk-pill ${riskLevel.toLowerCase().replace(' ','-')}`}>{riskLevel}</span><b>Story privacy risk</b><small>Remaining exposure from details still visible</small></div>
      <div className="risk-meter"><div className="risk-meter-fill" style={{width:`${riskScore}%`}}/></div>
      <div className="risk-legend"><span><i className="dot high"/> High 60–100</span><span><i className="dot medium"/> Medium 25–59</span><span><i className="dot low"/> Low 0–24</span></div>
     </div>
     <div className="findings-title"><b>Potentially sensitive details</b><span>Choose an action for each</span></div>{findings.map(f=><div className="finding" key={f.id}><div className="finding-info"><div className="finding-title-row"><b>{f.label}</b><span className={`finding-risk ${f.risk.toLowerCase()}`}>{actions[f.id]==='keep'?f.risk:'HIDDEN · 0 RISK'}</span></div><small>{f.detail}</small></div><div className="action-select">{['blur','keep'].map(a=><button key={a} className={actions[f.id]===a?'selected':''} onClick={()=>apply(f.id,a)}>{a[0].toUpperCase()+a.slice(1)}</button>)}</div></div>)}
     <div className="modal-actions"><button className="text-btn" onClick={reset}><RotateCcw size={15}/> Reset</button><button className="primary" onClick={()=>{setSafe(true);setScan(false)}}><Check size={16}/> Apply changes</button></div>
    </div></div>
   <div className="modal-foot"><ShieldCheck size={15}/> Risk score is simulated for this prototype. Your content stays in this browser demo; nothing is posted.</div>
  </div></div>}
 </div>
}
function BookmarkIcon(){return <span style={{fontSize:21,lineHeight:1}}>▱</span>}
createRoot(document.getElementById('root')).render(<App/>);
