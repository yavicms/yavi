let { useState } = ya;

function Div(props) {

    let [text, setText] = useState("");

    function Keyup(e) {
        setText(e.target.value);
    }

    return (
        <div>
            <div>{text}</div>
            <input type="text" onkeyup={Keyup} />
        </div>
    );
}

document.querySelector(".container").appendChild(<Div />);