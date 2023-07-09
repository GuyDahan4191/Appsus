export default {
    template:`
    <div className="apps-container">
        <div className="apps">
            <div className="keep">
                <RouterLink to="/keep">
               <img src="../../assets/img/keep.png" alt="" />
               <h2>Keep</h2>
               </RouterLink> 
            </div>
            
            <div className="mail">
                <RouterLink to="/mail">
                <img src="../../assets/img/gmail.png" alt="" />
                <h2>Mail</h2>
                </RouterLink> 
            </div>
        </div>
    </div>

    `
}