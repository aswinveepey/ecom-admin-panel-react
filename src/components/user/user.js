import React from 'react'
import AppBarComp from "../common/appbar";

class UserComp extends React.Component{
render(){
  return (
    <div>
      <AppBarComp title="Users" />
      {console.log(this.props.match.params.userId)}
      Individual user Component
    </div>
  );
}
}

export default UserComp;