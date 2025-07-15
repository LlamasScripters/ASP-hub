import {
	bz as R,
	by as _,
	t as c,
	u as f,
	c as i,
	bA as m,
	k as p,
	bx as q,
} from "./index-kb-Ylywn.js";
import { u as y } from "./useQuery-DObI4S3_.js";
const l = {
	all: ["blogs"],
	lists: () => [...l.all, "list"],
	list: (t) => [...l.lists(), { filters: t }],
	details: () => [...l.all, "detail"],
	detail: (t) => [...l.details(), t],
};
function D() {
	const t = i.c(1);
	let e;
	return (
		t[0] === Symbol.for("react.memo_cache_sentinel")
			? ((e = { queryKey: l.lists(), queryFn: C }), (t[0] = e))
			: (e = t[0]),
		y(e)
	);
}
async function C() {
	return (await q.getBlogs()).data;
}
function k() {
	const t = i.c(2),
		e = p();
	let s;
	return (
		t[0] !== e
			? ((s = {
					mutationFn: E,
					onSuccess: (r) => {
						e.invalidateQueries({ queryKey: l.lists() }),
							e.setQueryData(l.detail(r.id), r),
							c.success("Article créé avec succès !");
					},
					onError: K,
				}),
				(t[0] = e),
				(t[1] = s))
			: (s = t[1]),
		f(s)
	);
}
function K(t) {
	console.error("Erreur lors de la création de l'article:", t),
		c.error("Erreur lors de la création de l'article");
}
async function E(t) {
	return (await q.createBlog(t)).data;
}
function z() {
	const t = i.c(2),
		e = p();
	let s;
	return (
		t[0] !== e
			? ((s = {
					mutationFn: b,
					onSuccess: (r) => {
						e.setQueryData(l.detail(r.id), r),
							e.invalidateQueries({ queryKey: l.lists() }),
							c.success("Article mis à jour avec succès !");
					},
					onError: A,
				}),
				(t[0] = e),
				(t[1] = s))
			: (s = t[1]),
		f(s)
	);
}
function A(t) {
	console.error("Erreur lors de la mise à jour de l'article:", t),
		c.error("Erreur lors de la mise à jour de l'article");
}
async function b(t) {
	const { id: e, data: s } = t;
	return (await q.updateBlog(e, s)).data;
}
function M() {
	const t = i.c(2),
		e = p();
	let s;
	return (
		t[0] !== e
			? ((s = {
					mutationFn: F,
					onSuccess: (r) => {
						e.removeQueries({ queryKey: l.detail(r) }),
							e.setQueryData(l.lists(), (n) =>
								n ? n.filter((o) => o.id !== r) : [],
							),
							c.success("Article supprimé avec succès !");
					},
					onError: Q,
				}),
				(t[0] = e),
				(t[1] = s))
			: (s = t[1]),
		f(s)
	);
}
function Q(t) {
	console.error("Erreur lors de la suppression de l'article:", t),
		c.error("Erreur lors de la suppression de l'article");
}
async function F(t) {
	return await q.deleteBlog(t), t;
}
const g = {
	all: ["tags"],
	lists: () => [...g.all, "list"],
	details: () => [...g.all, "detail"],
	detail: (t) => [...g.details(), t],
};
function G() {
	const t = i.c(1);
	let e;
	return (
		t[0] === Symbol.for("react.memo_cache_sentinel")
			? ((e = { queryKey: g.lists(), queryFn: $ }), (t[0] = e))
			: (e = t[0]),
		y(e)
	);
}
async function $() {
	return (await _.getTags()).data;
}
const u = {
	all: ["comments"],
	lists: () => [...u.all, "list"],
	list: (t) => [...u.lists(), { articleId: t }],
	details: () => [...u.all, "detail"],
	detail: (t) => [...u.details(), t],
	counts: () => [...u.all, "count"],
	count: (t) => [...u.counts(), { articleId: t }],
};
function H(t) {
	const e = i.c(8);
	let s;
	e[0] !== t ? ((s = u.list(t)), (e[0] = t), (e[1] = s)) : (s = e[1]);
	let r;
	e[2] !== t
		? ((r = async () => (await R.getCommentsByArticleId(t)).data),
			(e[2] = t),
			(e[3] = r))
		: (r = e[3]);
	const n = !!t;
	let o;
	return (
		e[4] !== s || e[5] !== r || e[6] !== n
			? ((o = { queryKey: s, queryFn: r, enabled: n }),
				(e[4] = s),
				(e[5] = r),
				(e[6] = n),
				(e[7] = o))
			: (o = e[7]),
		y(o)
	);
}
function J() {
	const t = i.c(2),
		e = p();
	let s;
	return (
		t[0] !== e
			? ((s = {
					mutationFn: w,
					onSuccess: (r) => {
						e.invalidateQueries({ queryKey: u.list(r.articleId) }),
							e.invalidateQueries({ queryKey: u.count(r.articleId) }),
							e.invalidateQueries({ queryKey: l.lists() }),
							c.success("Commentaire publié avec succès !");
					},
					onError: v,
				}),
				(t[0] = e),
				(t[1] = s))
			: (s = t[1]),
		f(s)
	);
}
function v(t) {
	console.error("Erreur lors de la création du commentaire:", t),
		c.error("Erreur lors de la publication du commentaire");
}
async function w(t) {
	return (await R.createComment(t)).data;
}
const a = {
	all: ["reactions"],
	types: () => [...a.all, "types"],
	articleReactions: (t) => [...a.all, "article", t],
	commentReactions: (t) => [...a.all, "comment", t],
	userArticleReaction: (t) => [...a.all, "user", "article", t],
	userCommentReaction: (t) => [...a.all, "user", "comment", t],
};
function L() {
	const t = i.c(1);
	let e;
	return (
		t[0] === Symbol.for("react.memo_cache_sentinel")
			? ((e = { queryKey: a.types(), queryFn: S }), (t[0] = e))
			: (e = t[0]),
		y(e)
	);
}
async function S() {
	return (await m.getReactionTypes()).data;
}
function N(t) {
	const e = i.c(8);
	let s;
	e[0] !== t
		? ((s = a.articleReactions(t)), (e[0] = t), (e[1] = s))
		: (s = e[1]);
	let r;
	e[2] !== t
		? ((r = async () => (await m.getArticleReactions(t)).data),
			(e[2] = t),
			(e[3] = r))
		: (r = e[3]);
	const n = !!t;
	let o;
	return (
		e[4] !== s || e[5] !== r || e[6] !== n
			? ((o = { queryKey: s, queryFn: r, enabled: n }),
				(e[4] = s),
				(e[5] = r),
				(e[6] = n),
				(e[7] = o))
			: (o = e[7]),
		y(o)
	);
}
function O(t) {
	const e = i.c(8);
	let s;
	e[0] !== t
		? ((s = a.commentReactions(t)), (e[0] = t), (e[1] = s))
		: (s = e[1]);
	let r;
	e[2] !== t
		? ((r = async () => (await m.getCommentReactions(t)).data),
			(e[2] = t),
			(e[3] = r))
		: (r = e[3]);
	const n = !!t;
	let o;
	return (
		e[4] !== s || e[5] !== r || e[6] !== n
			? ((o = { queryKey: s, queryFn: r, enabled: n }),
				(e[4] = s),
				(e[5] = r),
				(e[6] = n),
				(e[7] = o))
			: (o = e[7]),
		y(o)
	);
}
function P(t) {
	const e = i.c(8);
	let s;
	e[0] !== t
		? ((s = a.userArticleReaction(t)), (e[0] = t), (e[1] = s))
		: (s = e[1]);
	let r;
	e[2] !== t
		? ((r = async () => (await m.getUserArticleReaction(t)).data),
			(e[2] = t),
			(e[3] = r))
		: (r = e[3]);
	const n = !!t;
	let o;
	return (
		e[4] !== s || e[5] !== r || e[6] !== n
			? ((o = { queryKey: s, queryFn: r, enabled: n }),
				(e[4] = s),
				(e[5] = r),
				(e[6] = n),
				(e[7] = o))
			: (o = e[7]),
		y(o)
	);
}
function V(t) {
	const e = i.c(8);
	let s;
	e[0] !== t
		? ((s = a.userCommentReaction(t)), (e[0] = t), (e[1] = s))
		: (s = e[1]);
	let r;
	e[2] !== t
		? ((r = async () => (await m.getUserCommentReaction(t)).data),
			(e[2] = t),
			(e[3] = r))
		: (r = e[3]);
	const n = !!t;
	let o;
	return (
		e[4] !== s || e[5] !== r || e[6] !== n
			? ((o = { queryKey: s, queryFn: r, enabled: n }),
				(e[4] = s),
				(e[5] = r),
				(e[6] = n),
				(e[7] = o))
			: (o = e[7]),
		y(o)
	);
}
function W() {
	const t = i.c(2),
		e = p();
	let s;
	return (
		t[0] !== e
			? ((s = {
					mutationFn: T,
					onSuccess: (r, n) => {
						e.invalidateQueries({ queryKey: a.articleReactions(n.articleId) }),
							e.invalidateQueries({
								queryKey: a.userArticleReaction(n.articleId),
							});
					},
					onError: B,
				}),
				(t[0] = e),
				(t[1] = s))
			: (s = t[1]),
		f(s)
	);
}
function B(t) {
	console.error("Erreur lors du toggle de la réaction:", t),
		c.error("Erreur lors de la gestion de la réaction");
}
async function T(t) {
	return (await m.toggleArticleReaction(t)).data;
}
function X() {
	const t = i.c(2),
		e = p();
	let s;
	return (
		t[0] !== e
			? ((s = {
					mutationFn: h,
					onSuccess: (r, n) => {
						e.invalidateQueries({ queryKey: a.commentReactions(n.commentId) }),
							e.invalidateQueries({
								queryKey: a.userCommentReaction(n.commentId),
							});
					},
					onError: U,
				}),
				(t[0] = e),
				(t[1] = s))
			: (s = t[1]),
		f(s)
	);
}
function U(t) {
	console.error("Erreur lors du toggle de la réaction:", t),
		c.error("Erreur lors de la gestion de la réaction");
}
async function h(t) {
	return (await m.toggleCommentReaction(t)).data;
}
export {
	M as a,
	k as b,
	G as c,
	z as d,
	L as e,
	O as f,
	V as g,
	X as h,
	N as i,
	P as j,
	W as k,
	H as l,
	J as m,
	D as u,
};
