import EditorLayout from '../components/editor/EditorLayout';

// Set to dynamic rendering for full client-side interactivity
export const dynamic = 'force-dynamic';

export default function HomePage() {
  return (
    <main>
      <EditorLayout />
    </main>
  );
}