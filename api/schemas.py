from typing import List, Optional

from pydantic import BaseModel

class LeadBase(BaseModel):
    name: str
    phone: str
    email: str
    id: str

class LeadCreate(LeadBase):
    pass

class Lead(LeadBase):

    class Config:
        orm_mode = True