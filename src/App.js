import { useState } from "react";

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

  const [friends, setFriends] = useState(initialFriends);
  function handleAddNewFriend(newFriend) {
    setFriends((friends) => [...friends, newFriend]);
  }

  return (
    <div className="app">
      <div className="sidebar">
        <FriendList friends={friends} />
        <AddFriend onAddNewFriend={handleAddNewFriend} />
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
        <Friend friend={friend} key={friend.id} />
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

function AddFriend({ onAddNewFriend }) {
  const [isAddingFriend, setIsAddingFriend] = useState(false);
  return (
    <>
      <FormAddFriend
        isAddingFriend={isAddingFriend}
        onAddNewFriend={onAddNewFriend}
      />
      <Button
        onIsAddingFriend={() =>
          setIsAddingFriend((isAddingFriend) => !isAddingFriend)
        }
        type="adding-friend"
      >
        {isAddingFriend ? "Close" : "Add friend"}
      </Button>
    </>
  );
}

function FormAddFriend({ isAddingFriend, onAddNewFriend }) {
  const [name, setName] = useState("");
  const [image, setImage] = useState("https://i.pravatar.cc/48?u=100001");

  function addNewFriend(e) {
    e.preventDefault();
    const newFriend = {
      name: name,
      image: image,
      balance: 0,
      id: crypto.randomUUID,
    };
    onAddNewFriend(newFriend);
    setName("");
    setImage("https://i.pravatar.cc/48?u=100001");
  }

  if (isAddingFriend)
    return (
      <form className="form-add-friend" onSubmit={addNewFriend}>
        <label>👯Friend name</label>
        <input
          type="text"
          onChange={(e) => setName(e.target.value)}
          value={name}
        />

        <label>🌠Image URL</label>
        <input
          type="text"
          onChange={(e) => setImage((image) => e.target.value)}
          value={image}
        />

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

function Button({ children, onIsAddingFriend, type }) {
  function handleClick(type) {
    if (type === "adding-friend") onIsAddingFriend();
  }
  return (
    <button className="button" onClick={() => handleClick(type)}>
      {children}
    </button>
  );
}

export default App;
