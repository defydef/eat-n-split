function App() {
  const initialFriends = [
    {
      id: 118836,
      name: "Clark",
      image: "https://i.pravatar.cc/48?u=118836",
      balance: -7,
    },
    {
      id: 933372,
      name: "Sarah",
      image: "https://i.pravatar.cc/48?u=933372",
      balance: 20,
    },
    {
      id: 499476,
      name: "Anthony",
      image: "https://i.pravatar.cc/48?u=499476",
      balance: 0,
    },
  ];
  return (
    <div className="app">
      <div className="sidebar">
        <FriendList friends={initialFriends} />
        <FormAddFriend />
        <Button>Add friend</Button>
      </div>
      <div>
        <FormSplitBill friend={initialFriends[0]} />
      </div>
    </div>
  );
}

function FriendList({ friends }) {
  return (
    <ul>
      {friends.map((friend) => (
        <Friend friend={friend} />
      ))}{" "}
    </ul>
  );
}

function Friend({ friend }) {
  return (
    <li>
      <img src={friend.image} alt="friend avatar" />
      <h3>{friend.name}</h3>
      {friend.balance < 0 ? (
        <p className="red">
          You owe {friend.name} ${Math.abs(friend.balance)}
        </p>
      ) : friend.balance > 0 ? (
        <p className="green">
          {friend.name} owes you ${Math.abs(friend.balance)}
        </p>
      ) : (
        <p>You and {friend.name} are even</p>
      )}
      <Button>Select</Button>
    </li>
  );
}

function FormAddFriend() {
  return (
    <form className="form-add-friend">
      <label>👯Friend name</label>
      <input type="text" />
      <label>🌠Image URL</label>
      <input type="text" />
      <Button>Add</Button>
    </form>
  );
}

function FormSplitBill({ friend }) {
  return (
    <form className="form-split-bill">
      <h2>Split a bill with {friend.name}</h2>
      <label>💰Bill value</label>
      <input type="text" />
      <label>💃Your expense</label>
      {friend.balance < 0 ? (
        <input type="text" />
      ) : (
        <input type="text" disabled />
      )}
      <label>👯{friend.name}'s expense</label>
      {friend.balance > 0 ? (
        <input type="text" />
      ) : (
        <input type="text" disabled />
      )}
      <label>🤑Who is paying the bill?</label>
      <select>
        <option value="you">You</option>
        <option value={friend}>{friend.name}</option>
      </select>
      <Button>Split bill</Button>
    </form>
  );
}

function Button({ children }) {
  return <button className="button">{children}</button>;
}

export default App;
