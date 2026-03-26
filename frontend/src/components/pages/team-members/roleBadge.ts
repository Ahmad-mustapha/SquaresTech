export const getRoleBadgeClasses = (role: string) => {
  const r = role.toLowerCase();
  if (r.includes('frontend')) return 'bg-blue-50 text-blue-600';
  if (r.includes('backend')) return 'bg-emerald-50 text-emerald-600';
  if (r.includes('full stack') || r.includes('fullstack')) return 'bg-violet-50 text-violet-600';
  if (r.includes('design')) return 'bg-pink-50 text-pink-600';
  if (r.includes('devops') || r.includes('infra')) return 'bg-amber-50 text-amber-600';
  if (r.includes('manager') || r.includes('lead')) return 'bg-indigo-50 text-indigo-600';
  return 'bg-gray-50 text-gray-600';
};
