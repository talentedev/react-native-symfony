<?php

namespace App\Model;

use doctrine\GraphQLite\Annotations\Field;
use doctrine\GraphQLite\Annotations\Type;

/**
 * Mimic class to ResultIterator
 * @Type
 */
class Notifications
{
    /**
     * @var array
     */
    private $notifications;
    /**
     * @var int
     */
    private $count;

    /**
     * PromotionType constructor.
     * @param Notification[] $notifications
     * @param int $count
     */
    public function __construct(array $notifications, int $count)
    {
        $this->notifications = $notifications;
        $this->count = $count;
    }

    /**
     * @Field()
     * @return int
     */
    public function getCount(): int
    {
        return $this->count;
    }

    /**
     * @Field()
     * @return Notification[]
     */
    public function getItems(): array
    {
        return $this->notifications;
    }
}
