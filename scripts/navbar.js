
function navbar (){
    const nav = `<header class="header">
        <a href="./index.html" class="logo">
            <img src="./assets/logo.png" alt="Remedica-logo">
        </a>

        <!-- navbar -->
         <nav class="headbar">
            <a href="./index.html">Home</a>
            <a href="./login.html">Login</a>
            <a href="./doctor.html">Doctors</a>
            <a href="./medicine.html">Medicines</a>
            <a href="./service.html">Services</a>
            <a href="./service.html">Contact</a>
            
         </nav>
        <!-- navbar -->

        <div class="search-bar">
                <input type="text" placeholder="Search....." id="search-input">
                <button>Search</button>
        </div>

        <div class="menubtn">
            <button>Helpline</button>
        </div>
     </header>`;

    document.getElementById('navbar').innerHTML = nav;
}

export {navbar};