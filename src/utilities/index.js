import { getClassifications } from '../models/index.js';
 
const getNav = async () => {
    const classifications = await getClassifications();
    let nav = '<nav><ul>';
    classifications.forEach((row) => {
        const id = row.classification_id;
        const name = row.classification_name;
        nav += `<li><a href="/category/view/${id}">${name}</a></li>`
    });
    return `${nav}
        <li><a href="/category/add/">Add Game</a></li>
        <li><a href="/category/addCategory">Add Category</a></li>
        <li><a href="/category/deleteCategory">Delete Category</a></li>
    </ul></nav>`;
};
 
export { getNav };