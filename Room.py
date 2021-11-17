class Room:
    def __init__(self, room_name):
        self.name = room_name
        self.members = []
    
    def add_member(self, user):
        self.members.append(user)

    def remove_member(self, username):
        for i, member in enumerate(self.members):
            if member['username'] == username:
                del self.members[i]