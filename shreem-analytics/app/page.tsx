export default function Home() {
  return (
    <main>
      {/* This allows your custom HTML to work inside Next.js */}
      <div dangerouslySetInnerHTML={{ __html: `
        
        ` }} />
    </main>
  );
}