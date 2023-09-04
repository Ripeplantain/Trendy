from enum import Enum


class BaseEnum(Enum):

    @classmethod
    def choices(cls):
        return tuple((x.name, x.value) for x in cls)

    @classmethod
    def values(cls):
        return tuple(x.value for x in cls)
    
    @classmethod
    def names(cls):
        return tuple(x.name for x in cls)