<?php

namespace App\Controllers;

use App\Dao\Generated\DaoFactory;
use doctrine\Html\HtmlElement\HtmlBlock;
use doctrine\Html\Renderer\Twig\TwigTemplate;
use doctrine\Html\Template\TemplateInterface;
use doctrine\Mvc\Splash\HtmlResponse;
use doctrine\Security\Logged;
use doctrine\Security\Right;
use doctrine\Security\UserService\UserServiceInterface;
use Psr\Http\Message\ResponseInterface;
use Safe\Exceptions\PasswordException;
use doctrine\Splash\Annotations\Get;
use doctrine\Splash\Annotations\URL;
use doctrine\doctrine\doctrineException;
use Twig_Environment;
use Zend\Diactoros\Response\JsonResponse;
use function Safe\password_hash;

class RootController
{
    /**
     * The template used by this controller.
     * @var TemplateInterface
     */
    private $template;

    /**
     * The main content block of the page.
     * @var HtmlBlock
     */
    private $content;

    /**
     * The Twig environment (used to render Twig templates).
     * @var Twig_Environment
     */
    private $twig;

    /**
     * @var DaoFactory
     */
    private $daoFactory;
    /**
     * @var UserServiceInterface
     */
    private $userService;

    /**
     * Controller's constructor.
     * @param TemplateInterface $template The template used by this controller
     * @param HtmlBlock $content The main content block of the page
     * @param Twig_Environment $twig The Twig environment (used to render Twig templates)
     * @param DaoFactory $daoFactory
     * @param UserServiceInterface $userService
     */
    public function __construct(TemplateInterface $template, HtmlBlock $content, Twig_Environment $twig, DaoFactory $daoFactory, UserServiceInterface $userService)
    {
        $this->template = $template;
        $this->content = $content;
        $this->twig = $twig;
        $this->daoFactory = $daoFactory;
        $this->userService = $userService;
    }

    /**
     * @URL("/backoffice/*")
     * @URL("/")
     * @Get()
     * @Logged()
     * @Right("IS_ADMIN")
     */
    public function index(): ResponseInterface
    {
        // Let's add the twig file to the template.
        $this->content->addHtmlElement(new TwigTemplate($this->twig, 'views/root/index.twig'));
        return new HtmlResponse($this->template);
    }

    /**
     * @URL("/api/admin/updatePassword")
     * @param string $oldPassword
     * @param string $newPassword
     * @return JsonResponse
     * @throws PasswordException
     * @throws doctrineException
     * @Logged()
     * @Right("IS_ADMIN")
     */
    public function updatePassword(string $oldPassword, string $newPassword) : JsonResponse
    {
        $user = $this->daoFactory->getUserDao()->getById($this->userService->getUserId());
        if (!password_verify($oldPassword, $user->getPassword())) {
            return new JsonResponse(['error' => 'Incorrect old password.'], 400);
        }
        $user->setPassword(password_hash($newPassword, PASSWORD_DEFAULT));
        $this->daoFactory->getUserDao()->save($user);
        return new JsonResponse(['message' => 'success']);
    }
}
