<?php

switch ($this->job) {
    case 'getcategories':
        $db = JFactory::getDbo();
        $query = $db->getQuery(true);

        $query = "SELECT category_name FROM #__tssvideo_categories
                ORDER BY category_name";
        $db->setQuery($query);
        $result = $db->loadColumn();

        $response = json_encode(
            array("result" => "SUCCESS",
                "categories" => $result,
                "code" => 200)
        );
        break;

    case 'getcategoryid':
        $db = JFactory::getDbo();
        $query = $db->getQuery(true);

        $query = "SELECT id FROM #__tssvideo_categories
                    WHERE category_name=" . $db->quote($this->categoryname);
        $db->setQuery($query);
        $category_count = $db->query();
        $category_count = $db->getNumRows();

        if ($category_count > 0) {

            $categoryid = $db->loadResult();

        } else {

            $query = "INSERT INTO #__tssvideo_categories (category_name)
             VALUES (" . $db->quote($this->categoryname) . ")";
            $db->setQuery($query);
            $db->query();
            $categoryid = $db->insertid();
        }

        $response = json_encode(
            array("result" => "SUCCESS",
                "newCategoryID" => $categoryid,
                "code" => 200)
        );

        break;

    case 'getcategoryids':

        $categoryList = explode(",", $this->categories);
        $result = array();
        $db = JFactory::getDbo();
        $query = $db->getQuery(true);

        foreach ($categoryList as $category) {

            $query = "SELECT id FROM #__tssvideo_categories
                        WHERE category_name=" . $db->quote($category);
            $db->setQuery($query);
            $category_count = $db->query();
            $category_count = $db->getNumRows();

            if ($category_count > 0) {

                $categoryid = $db->loadResult();

            } else {

                $query = "INSERT INTO #__tssvideo_categories (category_name)
                             VALUES (" . $db->quote($category) . ")";
                $db->setQuery($query);
                $db->query();
                $categoryid = $db->insertid();
            }

            array_push($result, $categoryid);
        }

        $response = json_encode(
            array("result" => "SUCCESS",
                "categories" => $result,
                "code" => 200)
        );
        break;

    case 'newcategory':
        $db = JFactory::getDbo();
        $query = $db->getQuery(true);

        $query = "INSERT INTO #__tssvideo_categories (category_name)
                        VALUES (" . $db->quote($this->newcategoryname) . ")";
        $db->setQuery($query);
        $db->query();
        $newCategoryID = $db->insertid();
        $response = json_encode(
            array("result" => "SUCCESS",
                "newid" => $newCategoryID,
                "code" => 200)
        );
        break;

    case 'deletecategory':
        $db = JFactory::getDbo();
        $query = $db->getQuery(true);

        $query = "SELECT id from #__tssvideo_categories
                    WHERE category_name = " . $db->quote($this->category_to_delete);

        $db->setQuery($query);
        $category_id = $db->loadResult();

        // -------------------
        $query = $db->getQuery(true);
        $query->clear();

        $conditions = array(
            $db->quoteName('category_id') . ' = ' . $db->quote($category_id),
        );

        $query->delete($db->quoteName('#__tssvideo_videocategories'));
        $query->where($conditions);

        $db->setQuery($query);
        $result = $db->execute();

        // -------------------
        $query = $db->getQuery(true);
        $query->clear();

        $conditions = array(
            $db->quoteName('category_name') . ' = ' . $db->quote($this->category_to_delete),
        );

        $query->delete($db->quoteName('#__tssvideo_categories'));
        $query->where($conditions);

        $db->setQuery($query);

        $result = $db->execute();

        if ($result) {
            $response = json_encode(
                array("result" => "SUCCESS",
                    "message" => "Tag deleted",
                    "code" => 200)
            );
        } else {
            $response = json_encode(
                array("result" => "FAIL",
                    "message" => "Tag was not deleted",
                    "code" => 500)
            );
        }
        break;

    case 'updatecategory':
        $db = JFactory::getDbo();
        $query = $db->getQuery(true);

        $fields = array(
            $db->quoteName('category_name') . ' = ' . $db->quote($this->newvalue),
        );

        // Conditions for which records should be updated.
        $conditions = array(
            $db->quoteName('category_name') . ' = ' . $db->quote($this->oldvalue),
        );

        $query->update($db->quoteName('#__tssvideo_categories'))->set($fields)->where($conditions);
        $db->setQuery($query);
        $result = $db->execute();
        if ($result) {
            $response = json_encode(
                array("result" => "SUCCESS",
                    "message" => "Category was altered",
                    "code" => 200)
            );
        } else {
            $response = json_encode(
                array("result" => "FAIL",
                    "message" => "Category was not altered",
                    "code" => 500)
            );
        }

        break;

    default:
        $response = json_encode(
            array("result" => "SUCCESS",
                "data" => "No action was performed",
                "code" => 200)
        );
        break;
}

echo $response;
