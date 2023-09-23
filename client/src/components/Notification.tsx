import useNotification from "../custom/useNotification"


const Notification = () => {

  const { notifications } = useNotification()
  console.log(notifications)

  return (
    <div
        className="fixed top-16 right-2 w-80 h-96 bg-white dark:bg-gray-900 rounded-lg shadow-lg"
    >
        <div className="flex justify-between items-center border-b border-gray-200 dark:border-gray-700 p-4">
            <h3 className="text-xl font-medium mx-auto dark:text-white">Notifications</h3>
        </div>
        <div className="p-4">
            {notifications.map((notification, index) => (
                <div key={index} className="flex flex-col justify-between items-center p-2 my-2 border border-gray-200 dark:border-gray-700 rounded-lg">
                    <div className="flex items-center">
                        <div className="flex flex-col">
                            <p className="text-md font-medium dark:text-white">{notification.type}</p>
                            <p className="text-sm text-gray-500 dark:text-gray-400">{notification.content}</p>
                        </div>
                    </div>
                    <div className="flex flex-col">
                        <p className="text-xs text-gray-500 dark:text-gray-400">{notification.updated_at}</p>
                    </div>
                </div>
            ))}
        </div>
    </div>
  )
}

export default Notification
