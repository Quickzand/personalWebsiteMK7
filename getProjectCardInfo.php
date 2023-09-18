<?php

function getProjectInfo() {
    // Get the project info from projectInfo.json
    $projectInfo = file_get_contents("projectInfo.json");
    
    // Decode the project info
    $projectInfo = json_decode($projectInfo, true);

    // Array to store extracted project details
    $extractedProjects = [];

    // Go through each project and extract the required details 
    foreach ($projectInfo as $id => $project) {
        // Default values for each field
        $name = $description = $tags = $preview = $hasPassword = null;

        // Check for the existence of each key
        if (isset($project['name'])) {
            $name = $project['name'];
        }

        if (isset($project['tags'])) {
            $tags = $project['tags'];
        }

        if (isset($project['preview'])) {
            $preview = $project['preview'];
        }

        // Check if a password exists for the project
        $hasPassword = isset($project['hasPassword']) && !empty($project['hasPassword'] && $project['hasPassword'] == true);

        // Loop through sections to find the description (if sections exist)
        if (isset($project['sections']) && is_array($project['sections'])) {
            foreach ($project['sections'] as $section) {
                if (isset($section['title']) && $section['title'] == 'Description' && isset($section['content'])) {
                    $description = $section['content'];
                    break;
                }
            }
        }

        $extractedProjects[] = [
            'id' => $id,
            'name' => $name,
            'description' => $description,
            'tags' => $tags,
            'preview' => $preview,
            'hasPassword' => $hasPassword
        ];
    }

    return $extractedProjects;
}

echo json_encode(getProjectInfo());
