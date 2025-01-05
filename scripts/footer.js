
function footer(){
    const footer = `<!-- Footer section -->
     <div class="footer-container">
        <div class="footer_flexbox">
            <div class="footer-column">
                <div class="footer-linkcol">
                    <div class="footer_linksTitle">Company</div>
                    <div class="footer-linksListItem"> <a href="./about.html" target="_blank"></a>About Us</div>
                    <div class="footer-linksListItem"> <a href="./career.html" target="_blank"></a>Careers</div>
                    <div class="footer-linksListItem"> <a href="./service.html" target="_blank"></a>Services</div>
                </div>

                <div class="footer-linkcol">
                    <div class="footer_linksTitle">Featured Categories
                        <div class="footer-linksListItem">
                            <a href="#">Homeopathy Care</a>
                        </div>
                        <div class="footer-linksListItem">
                            <a href="#">Personal Care</a>
                        </div>
                        <div class="footer-linksListItem">
                            <a href="#">Skin Care</a>
                        </div>
                        <div class="footer-linksListItem">
                            <a href="#">Mother & Baby Care</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
     </div>
    <!-- Footer section -->`;

    document.getElementById('footer').innerHTML = footer;
}

export {footer};