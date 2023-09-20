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


// <!-- <div class="link" routerLink="" routerLinkActive="active">
// <span class="material-symbols-outlined"> globe </span>
// <span>Projects</span>
// </div>
// <div class="link" routerLink="/administrator/guide" routerLinkActive="active">
// <span class="material-symbols-outlined"> developer_guide </span>
// <span>Guide</span>
// </div>
// <div class="link" routerLink="/administrator/blogs" routerLinkActive="active">
// <span class="material-symbols-outlined"> rss_feed </span>
// <span>Blogs</span>
// </div>
// <div class="link" routerLink="/administrator/profile" routerLinkActive="active">
// <span class="material-symbols-outlined"> account_circle </span>
// <span>Profile</span>
// </div>
// <div class="link" routerLink="/administrator/accounts" routerLinkActive="active">
// <span class="material-symbols-outlined"> manage_accounts </span>
// <span>Access Control</span>
// </div> -->