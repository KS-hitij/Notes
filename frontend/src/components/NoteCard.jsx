export default function NoteCard({text,bgColor}){
    return(
        <div className="flex flex-wrap px-1.5 py-7 font-bold text-xl rounded-2xl w-100 h-80 shadow-2xl"
        style={{backgroundColor:bgColor}}
        >
            <p>{text}</p>
        </div>
    )
}