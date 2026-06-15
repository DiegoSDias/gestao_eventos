import { useEffect, useState } from "react";
import { api } from "../../../../services/api"; 
import type { Event } from "../../../../types/Event";
import { CardEvents } from "../../../ui/events/CardEvents";

type PaginatedState = {
  data: Event[];
  currentPage: number;
  lastPage: number;
  total: number;
};

export function FinishedEvents() {
  const [state, setState] = useState<PaginatedState>({ data: [], currentPage: 1, lastPage: 1, total: 0 });
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);

  const fetchEvents = async (page: number, isLoadMore = false) => {
    try {
      isLoadMore ? setLoadingMore(true) : setLoading(true);
      
      const response = await api.get(`/registrations-me?status=finished&page=${page}`); 
      
      const responseData = response.data.data;
      const newPaginatedData = {
        data: responseData.data || [],
        currentPage: responseData.current_page || 1,
        lastPage: responseData.last_page || 1,
        total: responseData.total || 0,
      };

      setState(prev => ({
        ...newPaginatedData,
        data: isLoadMore ? [...prev.data, ...newPaginatedData.data] : newPaginatedData.data
      }));

    } catch (error) {
      console.error("Erro ao buscar eventos finalizados:", error);
    } finally {
      isLoadMore ? setLoadingMore(false) : setLoading(false);
    }
  };

  useEffect(() => {
    fetchEvents(1);
  }, []);

  const hasMore = state.currentPage < state.lastPage;

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <span className="bg-emerald-100 text-emerald-800 text-sm font-semibold px-3 py-1 rounded-full">
          Total finalizados: {state.total}
        </span>
      </div>

      {loading ? (
        <div className="flex justify-center items-center py-20">
          <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-600"></div>
        </div>
      ) : state.data.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-3xl border border-slate-100 shadow-sm">
          <span className="text-4xl block mb-4">✅</span>
          <h3 className="text-lg font-bold text-slate-800">Nenhum evento concluído</h3>
          <p className="text-slate-500 mt-1 mx-auto text-sm">
            Você ainda não possui eventos que já foram finalizados.
          </p>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {state.data.map((event) => (
              <CardEvents key={event.id} event={event} />
            ))}
          </div>

          {hasMore && (
            <div className="mt-10 flex justify-center">
              <button
                onClick={() => fetchEvents(state.currentPage + 1, true)}
                disabled={loadingMore}
                className="bg-white border-2 border-blue-600 text-blue-600 hover:bg-blue-50 font-bold py-3 px-8 rounded-xl transition-all disabled:opacity-50 flex items-center gap-2 cursor-pointer"
              >
                {loadingMore ? "Carregando..." : "Carregar mais eventos"}
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}
