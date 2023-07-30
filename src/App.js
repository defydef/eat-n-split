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

  const [activeFriendId, setActiveFriendId] = useState(null);

  function handleActiveFriendId(id, activeFriendId) {
    if (id !== activeFriendId) {
      setActiveFriendId(id);
    } else {
      setActiveFriendId(null);
    }
  }

  const [isAddingFriend, setIsAddingFriend] = useState(false);
  const handleIsAddingFriend = () => setIsAddingFriend((isAdding) => !isAdding);

  function handleHideAddFriend() {
    setIsAddingFriend(false);
  }

  function handleFriendBalance(id, amount, whoIsPaying) {
    console.log(amount, whoIsPaying);
    setFriends((friends) =>
      friends.map((friend) =>
        friend.id === id
          ? {
              ...friend,
              balance:
                whoIsPaying === "user"
                  ? friend.balance + amount
                  : friend.balance - amount,
            }
          : friend
      )
    );
    setActiveFriendId(null);
  }

  return (
    <div className="app">
      <div className="sidebar">
        <FriendList
          friends={friends}
          onSetActiveFriendId={handleActiveFriendId}
          activeFriendId={activeFriendId}
          isAddingFriend={isAddingFriend}
          onHideAddFriend={handleHideAddFriend}
        />
        <AddFriend
          onAddNewFriend={handleAddNewFriend}
          activeFriendId={activeFriendId}
          isAddingFriend={isAddingFriend}
          onIsAddingFriend={handleIsAddingFriend}
        />
      </div>
      <div>
        <FormSplitBill
          friends={friends}
          activeFriendId={activeFriendId}
          isAddingFriend={isAddingFriend}
          onUpdateBalance={handleFriendBalance}
        />
      </div>
    </div>
  );
}

function FriendList({
  friends,
  onSetActiveFriendId,
  activeFriendId,
  isAddingFriend,
  onHideAddFriend,
}) {
  return (
    <ul>
      {friends.map((friend) => (
        <Friend
          friend={friend}
          key={friend.id}
          onSetActiveFriendId={onSetActiveFriendId}
          activeFriendId={activeFriendId}
          isAddingFriend={isAddingFriend}
          onHideAddFriend={onHideAddFriend}
        />
      ))}{" "}
    </ul>
  );
}

function Friend({
  friend,
  onSetActiveFriendId,
  activeFriendId,
  isAddingFriend,
  onHideAddFriend,
}) {
  return (
    <li
      className={
        friend.id === activeFriendId && !isAddingFriend ? "selected" : ""
      }
    >
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
      <Button
        type="show-split-bill"
        onSetActiveFriendId={onSetActiveFriendId}
        friendId={friend.id}
        activeFriendId={activeFriendId}
        onHideAddFriend={onHideAddFriend}
      >
        {friend.id === activeFriendId && !isAddingFriend ? "Close" : "Select"}
      </Button>
    </li>
  );
}

function AddFriend({ onAddNewFriend, onIsAddingFriend, isAddingFriend }) {
  return (
    <>
      <FormAddFriend
        isAddingFriend={isAddingFriend}
        onAddNewFriend={onAddNewFriend}
        onIsAddingFriend={onIsAddingFriend}
      />
      <Button onIsAddingFriend={onIsAddingFriend} type="adding-friend">
        {isAddingFriend ? "Close" : "Add friend"}
      </Button>
    </>
  );
}

function FormAddFriend({ isAddingFriend, onAddNewFriend, onIsAddingFriend }) {
  const [name, setName] = useState("");
  const [image, setImage] = useState("https://i.pravatar.cc/48?u=100001");

  function addNewFriend(e) {
    e.preventDefault();
    const newFriend = {
      name: name,
      image: image,
      balance: 0,
      id: crypto.randomUUID(),
    };
    onAddNewFriend(newFriend);
    setName("");
    setImage("https://i.pravatar.cc/48?u=100001");
    onIsAddingFriend();
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

function FormSplitBill({
  friends,
  activeFriendId,
  isAddingFriend,
  onUpdateBalance,
}) {
  function activeFriend(friend) {
    return friend.id === activeFriendId;
  }
  const friend = friends.find(activeFriend);

  const [bill, setBill] = useState("");
  const [paidByUser, setPaidByUser] = useState("");
  const paidByFriend = bill ? bill - paidByUser : "";
  const [whoIsPaying, setWhoIsPaying] = useState("user");

  function handleSubmit(e) {
    e.preventDefault();
    if (!paidByFriend || paidByFriend === "") return;
    onUpdateBalance(friend.id, paidByFriend, whoIsPaying);
    setBill("");
    setPaidByUser("");
    setWhoIsPaying("user");
  }

  return (
    activeFriendId &&
    !isAddingFriend && (
      <form className="form-split-bill" onSubmit={(e) => handleSubmit(e)}>
        <h2>Split a bill with {friend.name}</h2>
        <label>💰Bill value</label>
        <input
          type="text"
          value={bill}
          onChange={(e) => setBill(Number(e.target.value))}
        />
        <label>💃Your expense</label>
        <input
          type="text"
          value={paidByUser}
          onChange={(e) =>
            setPaidByUser(
              Number(e.target.value) <= bill
                ? Number(e.target.value)
                : paidByUser
            )
          }
        />
        <label>👯{friend.name}'s expense</label>
        <input type="text" disabled value={paidByFriend} />
        <label>🤑Who is paying the bill?</label>
        <select
          value={whoIsPaying}
          onChange={(e) => setWhoIsPaying(e.target.value)}
        >
          <option value="user">You</option>
          <option value="friend">{friend.name}</option>
        </select>
        <Button>Split bill</Button>
      </form>
    )
  );
}

function Button({
  children,
  onIsAddingFriend,
  type,
  onSetActiveFriendId,
  friendId,
  activeFriendId,
  onHideAddFriend,
}) {
  function handleClick(type) {
    if (type === "adding-friend") onIsAddingFriend();
    else if (type === "show-split-bill") {
      onSetActiveFriendId(friendId, activeFriendId);
      onHideAddFriend();
    }
  }
  return (
    <button className="button" onClick={() => handleClick(type)}>
      {children}
    </button>
  );
}

export default App;
