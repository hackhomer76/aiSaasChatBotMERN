import TextField from '@mui/material/TextField'

type Props = {
  name:string;
  type:string;
  label: string;
}



export default function CustomizedInput(props: Props) {
  return (
    <TextField margin='normal' InputLabelProps={{style: { color: "white"}}} name={props.name} label={props.label} type={props.type} InputProps={{ style: {width: "400px", borderRadius:10, fontSize:20, color: "white"}}}/>
  )
}
