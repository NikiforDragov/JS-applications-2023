import { showHome } from "./home.js";
import { createPost } from "./home.js";
import { cancelPost } from "./home.js";

const homeAnchorElement = document.querySelector('a');
homeAnchorElement.addEventListener('click', showHome);

const buttons = document.querySelectorAll('button');
const cancelBtn = buttons[0];
const postBtn = buttons[1];

cancelBtn.addEventListener('click', cancelPost)
postBtn.addEventListener('click', createPost);
