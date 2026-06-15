import { useSearchParams } from "react-router-dom";
import { OrganizerEvents } from "../events/my_events/OrganizerEvents";
import { TrashedEvents } from "../events/my_events/TrashedEvents";

export function EventsOrganizer() {
  const [searchParams] = useSearchParams();
  const activeTab = searchParams.get("tab") || "participant";

  const getHeaderInfo = () => {
    switch (activeTab) {
      case "trashed":
        return {
          title: "Eventos Deletados",
          subtitle: "Eventos que você excluiu.",
        };
      case "organizer":
      default:
        return {
          title: "Eventos Organizados",
          subtitle: "Gerencie os eventos criados por você.",
        };
    }
  };

  const { title, subtitle } = getHeaderInfo();

  return (
    <div className="min-h-screen bg-slate-50 p-6 md:p-10 font-sans pb-20">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8 border-b border-slate-200 pb-6 flex justify-between items-end">
          <div>
            <h1 className="text-3xl font-bold text-slate-800">{title}</h1>
            <p className="text-slate-500 mt-1">{subtitle}</p>
          </div>
        </div>
        <div className="mt-6">
          {activeTab === "organizer" && <OrganizerEvents />}
          {activeTab === "trashed" && <TrashedEvents />}
        </div>
      </div>
    </div>
  );
}
