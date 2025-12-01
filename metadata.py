"""Metadata schema for the trivago True replica entity."""

from agenticverse_entities.base.metadata_base import BaseMetadata, Metadata


class trivago_replica_metadata(BaseMetadata):
    """Describe injectable parameters for trivago replica."""

    def get_metadata(self) -> Metadata:
        return Metadata(
            domain="*.trivago.com",
            parameters={
                "port": "integer",
                "section": "string",  # e.g. index, packages, guides
                "type": "string",  # deal | package | guide | flight | car | destination
                "title": "string",
                "location": "string",
                "rating": "string",
                "summary": "string",
                "perks": "array",
                "price": "string",
                "duration": "string",
                "image": "string",
                "author": "string",
            },
        )
