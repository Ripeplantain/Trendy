from .baseEnum import BaseEnum


class NotificationType(BaseEnum):

    NEW_MESSAGE = 'NEW_MESSAGE'
    FRIEND_REQUEST = 'FRIEND_REQUEST'
    UPDATE = 'UPDATE'
    IMPRESSION = 'IMPRESSION'