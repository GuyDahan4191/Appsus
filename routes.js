import HomePage from "./views/HomePage.js";
import AboutUs from "./views/AboutUs.js";

import NoteIndex from "./apps/keep/pages/NoteIndex.js";

import MailIndex from "./apps/mail/pages/MailIndex.js";

import MailDetails from './apps/mail/pages/MailDetails.js'

const { createRouter, createWebHashHistory } = VueRouter;



const routerOptions = {
  history: createWebHashHistory(),
  routes: [
    {
      path: "/",
      component: HomePage,
    },
    {
      path: "/about",
      component: AboutUs,
    },
    {
      path: "/keep",
      component: NoteIndex,
    },
    {
      path: "/mail",
      component: MailIndex,
			children: [
				{
					path: ':emailId',
					component: MailDetails,
				}
			],
    },
		// {
		// 	path: '/mail/:emailId',
		// 	component: MailDetails,
		// },
  ],
};

export const router = createRouter(routerOptions);
