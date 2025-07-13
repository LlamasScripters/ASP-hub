import {
	b$ as C,
	k as _,
	t as a,
	b_ as h,
	r as i,
	u as m,
	c0 as n,
} from "./index-kb-Ylywn.js";
const k = {
	pending: "En attente",
	confirmed: "Confirmée",
	cancelled: "Annulée",
	completed: "Terminée",
	no_show: "Non présentée",
	rescheduled: "Reportée",
};
function F(s) {
	const d = s == null ? void 0 : s.searchParams,
		b = s == null ? void 0 : s.routeParams;
	let u, o;
	try {
		(u = d || h.useSearch()), (o = b || h.useParams());
	} catch {
		(u = d || {}), (o = b || {});
	}
	const t = (s == null ? void 0 : s.minibusId) || o.minibusId,
		c = _(),
		{ data: l, refetch: g } = C({
			queryKey: ["minibusReservations", t],
			queryFn: () => {
				if (!t) return Promise.resolve({ data: [], total: 0 });
				const e = new Date();
				e.setMonth(e.getMonth() - 6);
				const r = new Date();
				return (
					r.setMonth(r.getMonth() + 6),
					n.getMinibusReservationsByMinibusId(t, e, r)
				);
			},
		}),
		v = m({
			mutationFn: (e) => n.createMinibusReservation(e),
			onSuccess: () => {
				c.invalidateQueries({ queryKey: ["minibusReservations", t] }),
					a.success("Réservation de minibus créée avec succès");
			},
			onError: (e) => {
				const r = `Erreur lors de la création: ${e.message}`;
				a.error("Erreur", { description: r });
			},
		}),
		y = m({
			mutationFn: ({ id: e, data: r }) => n.updateMinibusReservation(e, r),
			onSuccess: () => {
				c.invalidateQueries({ queryKey: ["minibusReservations", t] }),
					a.success("Réservation de minibus mise à jour avec succès");
			},
			onError: (e) => {
				const r = `Erreur lors de la mise à jour: ${e.message}`;
				a.error("Erreur", { description: r });
			},
		}),
		M = m({
			mutationFn: (e) => n.deleteMinibusReservation(e),
			onSuccess: () => {
				c.invalidateQueries({ queryKey: ["minibusReservations", t] }),
					a.success("Réservation de minibus supprimée avec succès");
			},
			onError: (e) => {
				const r = `Erreur lors de la suppression: ${e.message}`;
				a.error("Erreur", { description: r });
			},
		}),
		E = i.useCallback(() => {
			console.warn(
				"updateFilters is deprecated - filtering is now done locally in the component",
			);
		}, []),
		f = i.useCallback(
			async (e) => {
				try {
					return await v.mutateAsync(e);
				} catch (r) {
					return console.error("Error creating minibus reservation:", r), null;
				}
			},
			[v],
		),
		p = i.useCallback(
			async (e, r) => {
				try {
					return await y.mutateAsync({ id: e, data: r });
				} catch (R) {
					return console.error("Error updating minibus reservation:", R), null;
				}
			},
			[y],
		),
		w = i.useCallback(
			async (e) => {
				try {
					return await M.mutateAsync(e), !0;
				} catch (r) {
					return console.error("Error deleting minibus reservation:", r), !1;
				}
			},
			[M],
		);
	return {
		minibusReservations: l.data,
		totalCount: l.total,
		loading: !l.data,
		filters: u,
		updateFilters: E,
		createMinibusReservation: f,
		updateMinibusReservation: p,
		deleteMinibusReservation: w,
		refetch: g,
	};
}
export { k as m, F as u };
