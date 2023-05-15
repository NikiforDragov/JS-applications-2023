import { logout } from "./api/user.js";
import { initializer } from "./router.js";
import { showCatalog } from "./views/catalog.js";
import { showCreate } from "./views/create.js";
import { showDetails } from "./views/details.js";
import { showHomeView } from "./views/home.js";
import { showLogin } from "./views/login.js";
import { showRegister } from "./views/register.js";



document.getElementById('defSection').remove();

const links = {
    '/': showHomeView,
    '/catalog': showCatalog,
    '/create': showCreate,
    '/details': showDetails,
    '/login': showLogin,
    '/register': showRegister,
    '/logout': logoutFunctionality,
}

const router = initializer(links);
router.updateNav();
router.goTo('/')

function logoutFunctionality() {
    logout();
    router.updateNav();
    router.goTo('/')
}