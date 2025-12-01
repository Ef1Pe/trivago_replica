"""Entity definition for the trivago replica."""
from agenticverse_entities.base.entity_base import BaseEntity

from metadata import trivago_replica_metadata
from server import start_server


class Entity(BaseEntity):
    """Expose the trivago replica to Agenticverse."""

    def __init__(self) -> None:
        super().__init__(metadata=trivago_replica_metadata())

    def start(self, **kwargs):  # type: ignore[override]
        port = kwargs.get("port", 5000)
        content_data = kwargs.get("content")
        return start_server(port=port, content_data=content_data)
