const User = ({user})=>{

    return(
        <div className="user-block">
            <img src={user.photo} alt="User"></img>
            <span className="user-block-name">{user.name}</span>
            <span>{user.position}</span>
            <div className="user-block-email">
                <span>{user.email}</span>
                <div className="tooltiptext">{user.email}</div>
            </div>
            <span>{user.phone}</span>
        </div>
    )
}

export default User;