export default ({ message }: { message: any }) => {
  return message && <div className="text-sm text-rose-500">{message}</div>
}
