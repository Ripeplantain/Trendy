import useNotification from "../custom/useNotification"
import dayjs from "dayjs"
import relativeTime from "dayjs/plugin/relativeTime"
import { CloseIcon } from "../utils/constants"

import React from "react"


const Notification = () => {

  dayjs.extend(relativeTime)
  const { notifications, markNotificationAsRead } = useNotification()

  return (
    <div
        className="fixed top-[38vh] md:top-16 md:right-2 w-full overflow-auto md:w-80 h-96 bg-white dark:bg-gray-900 rounded-lg shadow-lg"
    >
        <div className="flex justify-between items-center border-b border-gray-200 dark:border-gray-700 p-4">
            <h3 className="text-xl font-medium mx-auto dark:text-white">Notifications</h3>
        </div>
        <div className="p-4">
            {notifications.map((notification, index) => (
                <div key={index} className="flex flex-col justify-between items-start p-4 my-2 border border-gray-200 dark:border-gray-700 rounded-lg">
                    <div className="flex items-center gap-[4vw]">
                        <div className="flex flex-col">
                            <p className="text-md text-gray-500 dark:text-gray-400">{notification.content}</p>
                        </div>
                        <div 
                            onClick={() => markNotificationAsRead(notification.id)}
                            className="text-xl cursor-pointer">
                              <CloseIcon className="text-gray-500 dark:text-gray-400 hover:scale-150" />
                        </div>
                    </div>
                    <div className="flex flex-col">
                        <p className="text-xs text-gray-500 dark:text-gray-400">{`${dayjs(notification.updated_at).fromNow()}`}</p>
                    </div>
                </div>
            ))}
        </div>
    </div>
  )
}

export const MemoizedNotification = React.memo(Notification)
