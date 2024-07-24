import Spinner from './spinner'

export default function FullPageSpinner() {
  return (
    <div className="h-screen w-screen flex items-center justify-center capitalize">
      <div className="px-3 py-2 rounded-lg w-fit h-fit bg-black/60 flex items-center justify-center">
        <Spinner />
      </div>
    </div>
  )
}
