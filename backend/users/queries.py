import graphene

from .database import users_collection


class UserType(graphene.ObjectType):
    id = graphene.ID()
    name = graphene.String()
    email = graphene.String()
    role = graphene.String()
    created_at = graphene.String()


class Query(graphene.ObjectType):
    users = graphene.List(UserType)

    def resolve_users(self, info):
        users = []

        for user in users_collection.find():
            users.append(
                UserType(
                    id=str(user["_id"]),
                    name=user["name"],
                    email=user["email"],
                    role=user["role"],
                    created_at=user["created_at"].isoformat(),
                )
            )

        return users