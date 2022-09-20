import Loader from "./Loader";
import User from "./User";

function SectionUsers({usersData, loadNewPage, visibleButton}){
    return(
        <section className="section-users">
            <h2>Working with GET request</h2>
            <div className="users-list">
                {usersData.length > 0 ? usersData.map((item,index) => 
                    <User user={item} key={index}/>
                ) : <Loader/>}
            </div>
            {visibleButton ? <button className="primary" onClick={()=>loadNewPage()}>Show more</button> : null}
        </section>
    )
}

export default SectionUsers;