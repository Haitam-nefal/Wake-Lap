const navbar = document.getElementById("navbar");

navbar.innerHTML = `
    <nav class="flex flex-col md:flex-row justify-between items-center  max-w-6xl mx-auto min-h-20 py-2">
        <div class="logo">Logo</div>
        <ul class="flex items-center space-x-6">
            <li><a href="#">Home</a></li>
            <li><a href="#">Home</a></li>
            <li><a href="#">Home</a></li>
        </ul>
    </nav>
`;
export default navbar;
