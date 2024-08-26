"use client";
import axios from "axios";
import { useEffect, useState } from "react";
import Link from "next/link";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";

export default function ListVideo({ params }: { params: { id: string } }) {
  const { id } = params;
  const [videos, setVideos] = useState<any[]>([]);
  const [alert, setAlert] = useState<string | null>(null);

  const fetchVideoById = async (id: string) => {
    try {
      const response = await axios.get(`/api/Courses/${id}`, {
        headers: {
          Authorization: `Bearer ${process.env.API_SECRET_KEY}`,
        },
      });
      setVideos(response.data.courseSessions || []);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchVideoById(id);
  }, [id]);

  const handleOnDragEnd = async (result: any) => {
    if (!result.destination) return;

    const items = Array.from(videos);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    setVideos(items);

    try {
      const response = await axios.put(
        `/api/admin/Courses/update/${id}`,
        {
          order: items.map((item, index) => ({
            id: item.id,
            order: index + 1,
          })),
        },
        {
          headers: {
            Authorization: `Bearer ${process.env.API_SECRET_KEY}`,
          },
        }
      );

      if (response.status === 200) {
        setAlert(response.data.message);
        setTimeout(() => setAlert(null), 3000);
      }
    } catch (error) {
      console.error("Failed to update order", error);
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">List Video Courses : {id}</h1>

      {alert && (
        <p className="text-green-600 mb-4 border border-green-600 rounded-md bg-green-50 p-2">
          {alert}
        </p>
      )}

      <DragDropContext onDragEnd={handleOnDragEnd}>
        <Droppable droppableId="videos">
          {(provided) => (
            <div
              {...provided.droppableProps}
              ref={provided.innerRef}
              className="bg-white mt-2"
            >
              {videos.map((chapter, index) => (
                <Draggable
                  key={chapter.id}
                  draggableId={String(chapter.id)}
                  index={index}
                >
                  {(provided) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      className="py-2 px-4 border-b"
                    >
                      <div className="flex justify-between items-center">
                        <span>{chapter.title}</span>
                        <div className="flex gap-2">
                          <Link
                            href={`/admin/CourseManagement/video/edit/${chapter.id}`}
                            className="bg-green-500 text-white py-2 px-4 rounded"
                          >
                            Edit
                          </Link>
                          <Link
                            href={`/video/${chapter.videoUrl}`}
                            className="bg-blue-500 text-white py-2 px-4 rounded "
                          >
                            View
                          </Link>
                        </div>
                      </div>
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
}
