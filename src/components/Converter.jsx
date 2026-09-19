import React, { useState, useRef, useEffect } from 'react';

// ---------- Icons ----------
const UploadIcon = () => (
  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 3v12"/><path d="m17 8-5-5-5 5"/><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
  </svg>
);
const CopyIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect width="14" height="14" x="8" y="8" rx="2"/><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/>
  </svg>
);
const CheckIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--accent-blue)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20 6 9 17 4 12"/>
  </svg>
);
const ImageIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect width="18" height="18" x="3" y="3" rx="2"/><circle cx="9" cy="9" r="2"/><path d="m21 15-3.1-3.1a2 2 0 0 0-2.8 0L6 21"/>
  </svg>
);
const CodeIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="m16 18 6-6-6-6"/><path d="m8 6-6 6 6 6"/>
  </svg>
);
const SwitchIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--text-mute)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="m16 3 4 4-4 4"/><path d="M20 7H4"/><path d="m8 21-4-4 4-4"/><path d="M4 17h16"/>
  </svg>
);

// ---------- Styles ----------
const S = {
  // Layout
  root: { width:'100%', maxWidth:'860px', margin:'0 auto', display:'flex', flexDirection:'column', gap:'20px', fontFamily:'"Geist", Arial, sans-serif' },
  // Toggle bar
  toggleWrap: { display:'flex', justifyContent:'center' },
  toggleBar: { display:'inline-flex', flexDirection:'row', background:'var(--bg-elevated)', border:'1px solid var(--border-color)', borderRadius:'9999px', padding:'4px', gap:'0', boxShadow:'0 1px 2px rgba(0,0,0,0.05)', transition:'background-color 0.2s, border-color 0.2s' },
  tabActive: { padding:'8px 20px', borderRadius:'9999px', background:'var(--text-ink)', color:'var(--bg-page)', fontSize:'14px', fontWeight:'500', border:'none', cursor:'pointer', display:'flex', alignItems:'center', gap:'8px', whiteSpace:'nowrap', transition:'all 0.2s' },
  tabInactive: { padding:'8px 20px', borderRadius:'9999px', background:'transparent', color:'var(--text-body)', fontSize:'14px', fontWeight:'500', border:'none', cursor:'pointer', display:'flex', alignItems:'center', gap:'8px', whiteSpace:'nowrap', transition:'all 0.2s' },
  // Card
  card: { background:'var(--bg-elevated)', border:'1px solid var(--border-color)', borderRadius:'16px', boxShadow:'0 1px 2px rgba(0,0,0,0.04)', overflow:'hidden', transition:'background-color 0.2s, border-color 0.2s' },
  cardBody: { padding:'32px' },
  // Dropzone
  dropzone: (dragging) => ({ border: `2px dashed ${dragging ? 'var(--accent-blue)' : 'var(--border-color)'}`, borderRadius:'12px', padding:'48px 24px', display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', textAlign:'center', cursor:'pointer', background: dragging ? 'var(--bg-subtle)' : 'var(--bg-page)', transition:'all 0.15s' }),
  dropIcon: { width:'56px', height:'56px', borderRadius:'9999px', background:'var(--bg-elevated)', border:'1px solid var(--border-color)', display:'flex', alignItems:'center', justifyContent:'center', color:'var(--text-mute)', marginBottom:'16px' },
  dropTitle: { fontSize:'18px', fontWeight:'600', color:'var(--text-ink)', letterSpacing:'-0.3px', marginBottom:'8px' },
  dropSub: { fontSize:'14px', color:'var(--text-body)' },
  kbd: { fontFamily:'monospace', background:'var(--bg-subtle)', border:'1px solid var(--border-color)', color:'var(--text-ink)', borderRadius:'4px', padding:'1px 5px', fontSize:'12px' },
  // Results
  resultHeader: { display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:'24px' },
  resultTitle: { fontSize:'18px', fontWeight:'600', color:'var(--text-ink)', display:'flex', alignItems:'center', gap:'8px', margin:0 },
  resetBtn: { padding:'6px 14px', background:'var(--bg-subtle)', border:'1px solid var(--border-color)', borderRadius:'6px', fontSize:'13px', fontWeight:'500', color:'var(--text-body)', cursor:'pointer' },
  grid: { display:'grid', gridTemplateColumns:'minmax(160px, 240px) 1fr', gap:'20px' },
  previewBox: { border:'1px solid var(--border-color)', borderRadius:'12px', padding:'12px', background:'var(--bg-page)' },
  imgContainer: { aspectRatio:'1', background:'var(--bg-elevated)', borderRadius:'8px', border:'1px solid var(--border-color)', display:'flex', alignItems:'center', justifyContent:'center', overflow:'hidden', marginBottom:'12px' },
  metaTable: { fontSize:'12px', fontFamily:'monospace', display:'flex', flexDirection:'column', gap:'6px' },
  metaRow: { display:'flex', justifyContent:'space-between', paddingBottom:'6px', borderBottom:'1px solid var(--border-color)' },
  metaLabel: { color:'var(--text-mute)' },
  metaValue: { color:'var(--text-ink)', fontWeight:500 },
  // Code panel
  codePanel: { border:'1px solid var(--border-color)', borderRadius:'12px', overflow:'hidden', display:'flex', flexDirection:'column', background:'var(--bg-page)' },
  tabRow: { display:'flex', flexDirection:'row', borderBottom:'1px solid var(--border-color)', background:'var(--bg-elevated)', overflowX:'auto' },
  codeTabActive: { padding:'10px 16px', background:'transparent', border:'none', borderBottom:'2px solid var(--text-ink)', color:'var(--text-ink)', fontSize:'13px', fontWeight:'500', cursor:'pointer', whiteSpace:'nowrap' },
  codeTabInactive: { padding:'10px 16px', background:'transparent', border:'none', borderBottom:'2px solid transparent', color:'var(--text-mute)', fontSize:'13px', fontWeight:'500', cursor:'pointer', whiteSpace:'nowrap' },
  codeArea: { position:'relative', flex:1, display:'flex', flexDirection:'column' },
  textarea: { flex:1, minHeight:'180px', padding:'16px', fontSize:'13px', fontFamily:'monospace', background:'transparent', color:'var(--text-ink)', border:'none', resize:'none', outline:'none', lineHeight:1.6 },
  copyBtn: (copied) => ({ position:'absolute', top:'10px', right:'10px', display:'flex', alignItems:'center', gap:'6px', padding:'5px 10px', background:'var(--bg-elevated)', border:'1px solid var(--border-color)', borderRadius:'6px', fontSize:'12px', fontWeight:'500', color: copied ? 'var(--accent-blue)' : 'var(--text-ink)', cursor:'pointer', boxShadow:'0 1px 2px rgba(0,0,0,0.05)' }),
  // B64->Img
  twoColGrid: { display:'grid', gridTemplateColumns:'1fr 1fr', gap:'20px', minHeight:'380px' },
  panel: { border:'1px solid var(--border-color)', borderRadius:'12px', overflow:'hidden', display:'flex', flexDirection:'column' },
  panelHeader: { padding:'10px 16px', borderBottom:'1px solid var(--border-color)', background:'var(--bg-elevated)', fontSize:'13px', fontWeight:'500', color:'var(--text-ink)', display:'flex', alignItems:'center', gap:'8px' },
  panelBody: { padding:'12px', flex:1, display:'flex', flexDirection:'column' },
  pasteArea: { flex:1, minHeight:'200px', width:'100%', padding:'4px', fontSize:'13px', fontFamily:'monospace', background:'transparent', color:'var(--text-body)', border:'none', resize:'none', outline:'none', lineHeight:1.6 },
  checkerboard: { flex:1, display:'flex', alignItems:'center', justifyContent:'center', backgroundImage:'linear-gradient(45deg,var(--border-color) 25%,transparent 25%),linear-gradient(-45deg,var(--border-color) 25%,transparent 25%),linear-gradient(45deg,transparent 75%,var(--border-color) 75%),linear-gradient(-45deg,transparent 75%,var(--border-color) 75%)', backgroundSize:'16px 16px', backgroundPosition:'0 0,0 8px,8px -8px,-8px 0' },
  emptyState: { color:'var(--text-mute)', textAlign:'center', display:'flex', flexDirection:'column', alignItems:'center', gap:'8px' },
};

const SNIPPET_TABS = ['raw', 'html', 'css', 'react', 'tailwind', 'markdown'];

export default function Converter() {
  const [mode, setMode] = useState('img2b64');
  const [imageFile, setImageFile] = useState(null);
  const [base64Result, setBase64Result] = useState('');
  const [imageMeta, setImageMeta] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const [base64Input, setBase64Input] = useState('');
  const [decodedImage, setDecodedImage] = useState(null);
  const [decodeError, setDecodeError] = useState('');
  const [snippetTab, setSnippetTab] = useState('html');
  const [copiedSnippet, setCopiedSnippet] = useState(false);
  const fileInputRef = useRef(null);

  const handleFile = (file) => {
    if (!file || !file.type.startsWith('image/')) return;
    setImageFile(file);
    const reader = new FileReader();
    reader.onload = (e) => {
      const b64 = e.target.result;
      setBase64Result(b64);
      const img = new Image();
      img.onload = () => setImageMeta({ width: img.width, height: img.height, originalSize: file.size, base64Size: b64.length });
      img.src = b64;
    };
    reader.readAsDataURL(file);
  };

  const handleBase64Input = (e) => {
    const val = e.target.value.trim();
    setBase64Input(e.target.value);
    setDecodeError('');
    if (!val) { setDecodedImage(null); return; }
    let src = val;
    if (!src.startsWith('data:image')) {
      if (src.startsWith('/9j/')) src = `data:image/jpeg;base64,${src}`;
      else if (src.startsWith('iVBORw0KGgo')) src = `data:image/png;base64,${src}`;
      else if (src.startsWith('R0lGOD')) src = `data:image/gif;base64,${src}`;
      else if (src.startsWith('UklGR')) src = `data:image/webp;base64,${src}`;
      else src = `data:image/png;base64,${src}`;
    }
    const img = new Image();
    img.onload = () => setDecodedImage({ src, width: img.width, height: img.height });
    img.onerror = () => { setDecodedImage(null); setDecodeError('Invalid base64 image data.'); };
    img.src = src;
  };

  useEffect(() => {
    const handlePaste = (e) => {
      if (mode !== 'img2b64') return;
      const items = e.clipboardData?.items || [];
      for (let i = 0; i < items.length; i++) {
        if (items[i].type.startsWith('image/')) { handleFile(items[i].getAsFile()); break; }
      }
    };
    window.addEventListener('paste', handlePaste);
    return () => window.removeEventListener('paste', handlePaste);
  }, [mode]);

  const getSnippet = (type) => {
    if (!base64Result) return '';
    switch (type) {
      case 'raw': return base64Result;
      case 'html': return `<img src="${base64Result}" alt="image" />`;
      case 'css': return `background-image: url('${base64Result}');`;
      case 'react': return `<img src="${base64Result}" alt="image" />`;
      case 'tailwind': return `bg-[url('${base64Result}')]`;
      case 'markdown': return `![image](${base64Result})`;
      default: return '';
    }
  };

  const copySnippet = async () => {
    try {
      await navigator.clipboard.writeText(getSnippet(snippetTab));
      setCopiedSnippet(true);
      setTimeout(() => setCopiedSnippet(false), 2000);
    } catch {}
  };

  const fmt = (bytes) => {
    if (!bytes) return '0 B';
    const i = Math.floor(Math.log(bytes) / Math.log(1024));
    return (bytes / Math.pow(1024, i)).toFixed(1) + ' ' + ['B','KB','MB'][i];
  };

  return (
    <div style={S.root}>
      {/* Mode toggle */}
      <div style={S.toggleWrap}>
        <div style={S.toggleBar}>
          <button style={mode === 'img2b64' ? S.tabActive : S.tabInactive} onClick={() => setMode('img2b64')}>
            <ImageIcon /> Image to Base64
          </button>
          <button style={mode === 'b642img' ? S.tabActive : S.tabInactive} onClick={() => setMode('b642img')}>
            <CodeIcon /> Base64 to Image
          </button>
        </div>
      </div>

      {/* Card */}
      <div style={S.card}>
        <div style={S.cardBody}>
          {mode === 'img2b64' && (
            <>
              {!base64Result ? (
                /* Drop zone */
                <div
                  style={S.dropzone(isDragging)}
                  onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
                  onDragLeave={(e) => { e.preventDefault(); setIsDragging(false); }}
                  onDrop={(e) => { e.preventDefault(); setIsDragging(false); e.dataTransfer.files[0] && handleFile(e.dataTransfer.files[0]); }}
                  onClick={() => fileInputRef.current?.click()}
                >
                  <input ref={fileInputRef} type="file" accept="image/*" style={{ display:'none' }} onChange={(e) => e.target.files?.[0] && handleFile(e.target.files[0])} />
                  <div style={S.dropIcon}><UploadIcon /></div>
                  <p style={S.dropTitle}>Drag &amp; drop your image here</p>
                  <p style={S.dropSub}>or click to browse &nbsp;·&nbsp; press <kbd style={S.kbd}>Ctrl+V</kbd> to paste</p>
                </div>
              ) : (
                /* Result view */
                <>
                  <div style={S.resultHeader}>
                    <h3 style={S.resultTitle}>
                      <CheckIcon /> Encoding Complete
                    </h3>
                    <button style={S.resetBtn} onClick={() => { setBase64Result(''); setImageFile(null); setImageMeta(null); }}>
                      Convert Another
                    </button>
                  </div>

                  <div style={{ ...S.grid, gridTemplateColumns: 'minmax(160px, 240px) 1fr' }}>
                    {/* Preview + meta */}
                    <div style={S.previewBox}>
                      <div style={S.imgContainer}>
                        <img src={base64Result} alt="preview" style={{ maxWidth:'100%', maxHeight:'160px', objectFit:'contain' }} />
                      </div>
                      {imageMeta && (
                        <div style={S.metaTable}>
                          <div style={S.metaRow}><span style={S.metaLabel}>Dimensions</span><span style={S.metaValue}>{imageMeta.width}×{imageMeta.height}</span></div>
                          <div style={S.metaRow}><span style={S.metaLabel}>Original</span><span style={S.metaValue}>{fmt(imageMeta.originalSize)}</span></div>
                          <div style={{ ...S.metaRow, borderBottom:'none', paddingBottom:0 }}><span style={S.metaLabel}>Base64</span><span style={S.metaValue}>{fmt(imageMeta.base64Size)}</span></div>
                        </div>
                      )}
                    </div>

                    {/* Code panel */}
                    <div style={S.codePanel}>
                      <div style={S.tabRow}>
                        {SNIPPET_TABS.map(t => (
                          <button key={t} style={snippetTab === t ? S.codeTabActive : S.codeTabInactive} onClick={() => setSnippetTab(t)}>
                            {t.toUpperCase()}
                          </button>
                        ))}
                      </div>
                      <div style={S.codeArea}>
                        <textarea readOnly style={S.textarea} value={getSnippet(snippetTab)} />
                        <button style={S.copyBtn(copiedSnippet)} onClick={copySnippet}>
                          {copiedSnippet ? <CheckIcon /> : <CopyIcon />}
                          {copiedSnippet ? 'Copied!' : 'Copy'}
                        </button>
                      </div>
                    </div>
                  </div>
                </>
              )}
            </>
          )}

          {mode === 'b642img' && (
            <div style={S.twoColGrid}>
              {/* Input panel */}
              <div style={S.panel}>
                <div style={S.panelHeader}><CodeIcon /> Paste Base64 String</div>
                <div style={S.panelBody}>
                  <textarea
                    style={S.pasteArea}
                    placeholder="Paste your base64 string here (data:image/... or raw)..."
                    value={base64Input}
                    onChange={handleBase64Input}
                  />
                </div>
              </div>

              {/* Preview panel */}
              <div style={S.panel}>
                <div style={S.panelHeader}><ImageIcon /> Image Preview</div>
                <div style={{ ...S.panelBody, ...S.checkerboard }}>
                  {decodedImage ? (
                    <div style={{ display:'flex', flexDirection:'column', alignItems:'center', gap:'8px' }}>
                      <img src={decodedImage.src} alt="decoded" style={{ maxWidth:'100%', maxHeight:'280px', objectFit:'contain', boxShadow:'0 2px 8px rgba(0,0,0,0.08)', borderRadius:'4px' }} />
                      <span style={{ fontSize:'12px', fontFamily:'monospace', color:'var(--text-mute)' }}>{decodedImage.width}×{decodedImage.height}</span>
                    </div>
                  ) : (
                    <div style={S.emptyState}>
                      {decodeError
                        ? <span style={{ color:'#ee0000', fontSize:'14px' }}>{decodeError}</span>
                        : <><SwitchIcon /><span style={{ fontSize:'14px' }}>Preview appears here</span></>
                      }
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
