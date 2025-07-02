export default function TestApp() {
  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h1>Test App Loading</h1>
      <p>This is a simple test to verify React is working.</p>
      <button onClick={() => alert('Button works!')}>Click me</button>
    </div>
  );
}