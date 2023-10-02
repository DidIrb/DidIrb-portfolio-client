export const RouteList: routes[] = [
  {
    path: '/administrator/home',
    title: 'Dashboard',
    icon: 'dashboard',
  },
  {
    path: '/administrator/projects',
    title: 'Projects',
    icon: 'globe',
  },
  {
    path: '/administrator/guide',
    title: 'Guide',
    icon: 'developer_guide',
  },
  {
    path: '/administrator/blog',
    title: 'Blogs',
    icon: 'rss_feed',
  },
  {
    path: '/administrator/profile',
    title: 'Profile',
    icon: 'account_circle',
  },
  {
    path: '/administrator/accounts',
    title: 'Access Control',
    icon: 'manage_accounts',
  },
];

export interface routes {
  path: string,
  title: string,
  icon: string,
}
