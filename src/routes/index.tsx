import { createFileRoute } from '@tanstack/react-router'
import ImportStatus from "@/components/import-status.tsx";


export const Route = createFileRoute('/')({
  component: App,
});

function App() {
  return (
   <div>
     <ImportStatus />
   </div>
  )
}
