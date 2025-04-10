import Send from '../../icons/Send';
import IconButton from '../buttons/IconButton';
import style from './Input.module.css'

interface InputProps {
    text: string;
    setText: (text: string) => void;
    handleSend: () => void;
}

const Input = ({text, setText, handleSend}: InputProps) => {

    return (
        <div className={style.container}>
            <textarea
                className={style.textarea}
                placeholder='Type here'
                value={text}
                onChange={(e) => { setText(e.target.value) }}
            />
            <IconButton onClick={handleSend}><Send/></IconButton>
        </div>
    )
}

export default Input